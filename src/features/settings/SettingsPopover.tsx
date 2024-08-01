import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import UnitSelect from "./UnitSelect";
import TimezoneSelect from "./TimezoneSelect";
import LanguageSelect from "./LanguageSelect";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useOptionsStore } from "@/context";

export default function SettingsPopover(){
    const {t} = useTranslation();
    const titlePrivacy = useOptionsStore((state)=>state.displayLocationOnTitle);
    const setTitlePrivacy = useOptionsStore((state)=>state.setDisplayLocationOnTitle);
    return <Popover>
        <PopoverTrigger asChild>
            <Button className="flex-shrink-0 z-20 text-2xl" size={"icon"} variant={"ghost"}>
                <i className="bi-list"></i>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
            <span>{t("ui.units_label")}</span>
            <UnitSelect></UnitSelect>
            <span>{t("ui.timezone_label")}</span>
            <TimezoneSelect></TimezoneSelect>
            <span>{t("ui.language_selector_label")}</span>
            <LanguageSelect></LanguageSelect>
            <span>{t("ui.privacy_settings_label")}</span>
            <div className="flex items-center gap-1">
                <Switch onCheckedChange={(val)=>setTitlePrivacy(val)} checked={titlePrivacy} id="title-privacy-switch"></Switch>
                <Label htmlFor="title-privacy-switch">{t("ui.tab_title_privacy")}</Label>
            </div>
            <a href="https://github.com/astudentinearth/weather-app" className="underline text-muted-foreground">{t("ui.source_code_link")}</a>
            <a href="/weather-app/assets/THIRD_PARTY_LICENSES.txt" className="underline text-muted-foreground">{t("ui.third_party")}</a>
            
        </PopoverContent>
    </Popover>
}
