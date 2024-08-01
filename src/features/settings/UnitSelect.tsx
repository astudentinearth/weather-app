import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useOptionsStore } from "@/context/use-options-store";

export default function UnitSelect(){
    const temperatureUnit = useOptionsStore((state)=>state.temperatureUnit);
    const setTemperatureUnit = useOptionsStore((state)=>state.setTemperatureUnit);
    const setPrecipitationUnit = useOptionsStore((state)=>state.setPrecipitationUnit);
    const setSpeedUnit = useOptionsStore((state)=>state.setSpeedUnit);
    const {t} = useTranslation();
    return <Select value={temperatureUnit == "C" ? "metric" : "imp"} onValueChange={(e)=>{
        setSpeedUnit((e == "metric" ? "km" : "mph"));
        setPrecipitationUnit((e == "metric" ? "mm" : "inch"));
        setTemperatureUnit((e == "metric" ? "C" : "F"))
    }}>
        <SelectTrigger>
            <SelectValue placeholder={t("ui.units_label")}></SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="metric">{t("ui.metric_units")}</SelectItem>
            <SelectItem value="imp">{t("ui.imperial_units")}</SelectItem>
        </SelectContent>
    </Select>
}