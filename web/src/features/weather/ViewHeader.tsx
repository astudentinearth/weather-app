import { MapPin } from "lucide-react";
import LocationSearchDialog from "../locations/LocationSearchDialog";
import SettingsPopover from "../settings/SettingsPopover";
import { Location } from "@/lib";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewHeader(props: {location?: Location, isDefaultLocation?: boolean}){
    const {t, i18n} = useTranslation();
    return  <div className="hsm:self-start flex w-full gap-1 items-center">
        <span className="select-none flex-shrink-0">{props.location?.isAutoDetected ?
                     <div className="flex items-center gap-2"><MapPin className="inline" size={36}/>  {t("ui.auto_detected_location_name")}</div>
                    : (props.location ? (props.location?.name ?? `${props.location?.latitude.toFixed(4)} ${props.location?.longitude.toFixed(4)}`) : <LocationNameSkeleton/>)}
        </span> &nbsp;
        {props.location && <span className="text-zinc-500 select-none hidden sm:inline">{`${new Date().toLocaleDateString([i18n.resolvedLanguage ?? ""])}`}</span>}
        <div className="w-full"></div>
        <LocationSearchDialog></LocationSearchDialog>
        <SettingsPopover triggerTestID="desktop-settings-popover-trigger"></SettingsPopover>
    </div>
}

function LocationNameSkeleton(){
    return <Skeleton>
        <div className="h-6 w-64"></div>
    </Skeleton>
}