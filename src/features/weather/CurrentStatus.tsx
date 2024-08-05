import { useOptionsStore } from "@/context/use-options-store";
import { Direction, DirectionIcons } from "@/lib";
import { Droplet, Umbrella } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function CurrentStatus(props: {humidity: number, precipitation: number, wind: number, direction: Direction}){
    const speedUnit = useOptionsStore((state)=>state.speedUnit);
    const {t} = useTranslation();
    return <div className="inline-status-mobile select-none">
    <div className="float-left flex gap-2 items-center">
        <Droplet size={36} className="inline"></Droplet>
        <span>{t("percentage",{percent: props.humidity})}</span>
    </div>
    <div className="text-[#87C1FF] gap-2 float-left flex items-center">
        <Umbrella size={36}></Umbrella>
        <span>{t("percentage", {percent: props.precipitation})}</span>
    </div>
    <div className="float-left flex gap-2 items-center">
        {(()=>{
            const icon = DirectionIcons.get(props.direction);
            if(icon != undefined){
                return icon(36);
            } else return <></>
        })()}
        <span>{`${props.wind}${speedUnit}`}</span>
    </div>
</div>
}