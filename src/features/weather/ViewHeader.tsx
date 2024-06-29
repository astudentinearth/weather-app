import { Button } from "@/components/ui/button";
import { OptionsContext, PrefActions } from "@/context";
import LocationSearchDialog from "../locations/LocationSearchDialog";
import SettingsPopover from "../settings/SettingsPopover";
import { useContext } from "react";
import { Location } from "@/lib";
import { useTranslation } from "react-i18next";


export default function ViewHeader(props: {location?: Location, isDefaultLocation?: boolean}){
    const {dispatch} = useContext(OptionsContext);
    const {t} = useTranslation();
    return  <div className="hsm:self-start flex w-full gap-1 items-center">
        <span className="select-none flex-shrink-0">{`${props.location?.name ?? `${props.location?.latitude.toFixed(4)} ${props.location?.longitude.toFixed(4)}`}`}</span> &nbsp;
        <span className="text-zinc-500 select-none">{`${new Date().toLocaleDateString()}`}</span>
        <div className="w-full"></div>
        {(!props.isDefaultLocation) ? <Button size={"lg"} className="z-20 rounded-xl hidden sm:block border-2 border-border hover:bg-accent hover:text-accent-foreground" 
            variant={"ghost"}
            onClick={()=>{
                if(props.location) dispatch({type: PrefActions.SET_DEFAULT_LOCATION, value: props.location})
            }}>{t("ui.set_default_button")}</Button> : <></>}
        <LocationSearchDialog></LocationSearchDialog>
        <SettingsPopover></SettingsPopover>
    </div>
}