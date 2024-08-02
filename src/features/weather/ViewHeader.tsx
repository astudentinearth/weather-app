import LocationSearchDialog from "../locations/LocationSearchDialog";
import SettingsPopover from "../settings/SettingsPopover";
import { Location } from "@/lib";
import { useTranslation } from "react-i18next";

export default function ViewHeader(props: {location?: Location, isDefaultLocation?: boolean}){
    const {t, i18n} = useTranslation();
    return  <div className="hsm:self-start flex w-full gap-1 items-center">
        <span className="select-none flex-shrink-0">{props.location?.isAutoDetected ?
                     <span><i className="bi-geo-alt"></i>  {t("ui.auto_detected_location_name")}</span>
                    : (props.location?.name ?? `${props.location?.latitude.toFixed(4)} ${props.location?.longitude.toFixed(4)}`)}
        </span> &nbsp;
        <span className="text-zinc-500 select-none hidden sm:inline">{`${new Date().toLocaleDateString([i18n.resolvedLanguage ?? ""])}`}</span>
        <div className="w-full"></div>
        <LocationSearchDialog></LocationSearchDialog>
        <SettingsPopover></SettingsPopover>
    </div>
}