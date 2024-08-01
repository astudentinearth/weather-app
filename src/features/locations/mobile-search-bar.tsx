import { useWeatherStore } from "@/context";
import { cn } from "@/lib";
import { useTranslation } from "react-i18next";
import SettingsPopover from "../settings/SettingsPopover";

export function MobileSearchBar(){
    const location = useWeatherStore((state)=>state.current?.location);
    const {t} = useTranslation();
    const name = location?.isAutoDetected ? t("ui.auto_detected_location_name") : location?.name;

    return <div className={cn("bg-background border border-border m-2 h-10 rounded-xl flex items-center pl-2 pr-1 sm:hidden")}>
        <span className="text-foreground/50 text-lg">{name ?? ""}</span>
        <div className="flex-grow"></div>
        <SettingsPopover></SettingsPopover>
    </div>
}