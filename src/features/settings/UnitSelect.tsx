import { OptionsContext, PrefActions } from "@/context";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function UnitSelect(){
    const context = useContext(OptionsContext);
    const {options, dispatch} = context;
    const {t} = useTranslation();
    return <Select value={options.temperatureUnit == "C" ? "metric" : "imp"} onValueChange={(e)=>{
        dispatch({type: PrefActions.SET_SPEED_UNIT, value: (e == "metric" ? "km" : "mph")});
        dispatch({type: PrefActions.SET_PRECIPITATION_UNIT, value: (e == "metric" ? "mm" : "inch")});
        dispatch({type: PrefActions.SET_TEMP_UNIT, value: (e == "metric" ? "C" : "F")});
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