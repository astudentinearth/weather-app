import { useOptionsStore, useWeatherStore } from "@/context";
import { DirectionIcons } from "@/lib";
import { Droplet, Umbrella } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MobileStatus(){
    const {t} = useTranslation();
    const state = useWeatherStore((state)=>state.current)
    const speedUnit = useOptionsStore((state)=>state.speedUnit);
    return <div className="flex sm:hidden items-center justify-evenly m-2 gap-2">
        <div className="w-full  border border-border bg-background p-3 py-1 h-12 flex justify-center items-center rounded-xl gap-2">
            <Droplet size={20} className="inline translate-y-[-5%]"/>
            <span className="text-lg">{t("percentage",{percent: state?.humidity})}</span>
        </div>
        <div className="w-full  border border-border bg-background p-3 h-12 flex justify-center items-center rounded-xl gap-2">
            <Umbrella size={20} className="inline"/>
            <span className="text-lg">{t("percentage", {percent: state?.precipitationChance})}</span>
        </div>
        <div className="w-full  border border-border bg-background p-3 h-12 flex justify-center items-center rounded-xl gap-2">
            {(()=>{
                const icon = DirectionIcons.get(state?.windDirection ?? "N");
                if(icon != undefined){
                    return icon(20);
                } else return <></>
            })()}
            <span className="text-lg">{`${state?.wind}${speedUnit}`}</span>
        </div>
    </div>
}