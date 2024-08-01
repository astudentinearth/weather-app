import { useOptionsStore } from "@/context/use-options-store";
import { Direction, DirectionIcons } from "@/lib";
import { useTranslation } from "react-i18next";


export default function CurrentStatus(props: {humidity: number, precipitation: number, wind: number, direction: Direction}){
    const speedUnit = useOptionsStore((state)=>state.speedUnit);
    const {t} = useTranslation();
    return <div className="inline-status-mobile select-none">
    <span>
        <i className="bi-droplet-fill"></i>
        <span>{t("percentage",{percent: props.humidity})}</span>
    </span>
    <span className="text-[#87C1FF]">
        <i className="bi-umbrella"></i>
        <span>{t("percentage", {percent: props.precipitation})}</span>
    </span>
    <span>
        <i className={DirectionIcons.get(props.direction ?? "NE")}></i>
        <span>{`${props.wind}${speedUnit}`}</span>
    </span>
</div>
}