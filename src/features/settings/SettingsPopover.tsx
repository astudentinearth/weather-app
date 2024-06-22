import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { OptionsContext, PrefActions } from "@/context";
import getLinkedLocation from "@/lib/getLinkedLocation";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function SettingsPopover(){
    const context = useContext(OptionsContext);
    const {options, dispatch} = context;
    const [searchParams] = useSearchParams();
    const {t, i18n} = useTranslation();
    return <Popover>
        <PopoverTrigger asChild>
            <Button className="flex-shrink-0 z-20 text-2xl" size={"icon"} variant={"ghost"}>
                <i className="bi-list"></i>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1">
            <Button size={"lg"} className="z-20 rounded-xl sm:hidden border-2 border-border hover:bg-accent hover:text-accent-foreground" 
                variant={"ghost"}
                onClick={()=>{
                    dispatch({type: PrefActions.SET_DEFAULT_LOCATION, value: getLinkedLocation(searchParams, options)})
                }}>{t("ui.set_default_button")}</Button>
            <span>{t("ui.units_label")}</span>
            <Select value={options.temperatureUnit == "C" ? "metric" : "imp"} onValueChange={(e)=>{
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
            <span>{t("ui.language_selector_label")}</span>
            <Select value={i18n.resolvedLanguage} onValueChange={(e)=>{
                i18n.changeLanguage(e);
            }}>
                <SelectTrigger>
                    <SelectValue placeholder={t("ui.language_selector_label")}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tr">Türkçe</SelectItem>
                </SelectContent>
            </Select>
            <a href="https://github.com/astudentinearth/weather-app" className="underline text-muted-foreground">{t("ui.source_code_link")}</a>
            <a href="/weather-app/assets/THIRD_PARTY_LICENSES.txt" className="underline text-muted-foreground">{t("ui.third_party")}</a>
        </PopoverContent>
    </Popover>
}
