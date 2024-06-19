import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { OptionsContext, PrefActions } from "@/context";
import getLinkedLocation from "@/lib/getLinkedLocation";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SettingsPopover(){
    const context = useContext(OptionsContext);
    const {options, dispatch} = context;
    const [searchParams] = useSearchParams();
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
                }}>Set as default location</Button>
            <span>Units</span>
            <Select value={options.temperatureUnit == "C" ? "metric" : "imp"} onValueChange={(e)=>{
                dispatch({type: PrefActions.SET_SPEED_UNIT, value: (e == "metric" ? "km" : "mph")});
                dispatch({type: PrefActions.SET_PRECIPITATION_UNIT, value: (e == "metric" ? "mm" : "inch")});
                dispatch({type: PrefActions.SET_TEMP_UNIT, value: (e == "metric" ? "C" : "F")});
            }}>
                <SelectTrigger>
                    <SelectValue placeholder="Units"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="metric">°C | km/h | milimeters</SelectItem>
                    <SelectItem value="imp">°F | mph | inches</SelectItem>
                </SelectContent>
            </Select>
        </PopoverContent>
    </Popover>
}
