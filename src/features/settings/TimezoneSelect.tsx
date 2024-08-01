import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useOptionsStore } from "@/context/use-options-store";

export default function TimezoneSelect(){
    const setTimezone = useOptionsStore((state)=>state.setTimezone);
    const timezone = useOptionsStore((state)=>state.timezone);
    const {t} = useTranslation();
    return <Select value={timezone} onValueChange={(e: ("auto" | "utc" | "local"))=>{
        setTimezone(e);
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