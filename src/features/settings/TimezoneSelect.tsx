import { OptionsContext, PrefActions } from "@/context";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function TimezoneSelect(){
    const context = useContext(OptionsContext);
    const {options, dispatch} = context;
    const {t} = useTranslation();
    return <Select value={options.timezone} onValueChange={(e: ("auto" | "utc" | "local"))=>{
        dispatch({type: PrefActions.SET_TIMEZONE, value: e})
    }}>
        <SelectTrigger>
            <SelectValue placeholder={t("ui.timezone_label")}></SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="auto">{t("ui.timezone_auto")}</SelectItem>
            <SelectItem value="utc">{t("ui.timezone_utc")}</SelectItem>
            <SelectItem value="local">{t("ui.timezone_local")}</SelectItem>
        </SelectContent>
    </Select>
}