import { useOptionsStore, useWeatherStore } from "@/context";
import { DirectionIcons } from "@/lib";
import { useTranslation } from "react-i18next";

export function MobileStatus(){
    const {t} = useTranslation();
    const state = useWeatherStore((state)=>state.current)
    const speedUnit = useOptionsStore((state)=>state.speedUnit);
    return <div className="flex items-center justify-evenly p-3 gap-2">
        <div className="w-full  border border-border bg-background p-3 py-1 h-12 flex justify-center items-center rounded-xl gap-2">
            <i className="bi-droplet-fill"></i>
            <span className="text-lg">{t("percentage",{percent: state?.humidity})}</span>
        </div>
        <div className="w-full  border border-border bg-background p-3 h-12 flex justify-center items-center rounded-xl gap-2">
            <i className="bi-umbrella"></i>
            <span className="text-lg">{t("percentage", {percent: state?.precipitationChance})}</span>
        </div>
        <div className="w-full  border border-border bg-background p-3 h-12 flex justify-center items-center rounded-xl gap-2">
            <i className={DirectionIcons.get(state?.windDirection ?? "NE")}></i>
            <span className="text-lg">{`${state?.wind}${speedUnit}`}</span>
        </div>
    </div>
}