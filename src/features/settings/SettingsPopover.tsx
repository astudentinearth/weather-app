import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { OptionsContext, PrefActions } from "@/context";
import { useContext, useState } from "react";

export default function SettingsPopover(){
    const context = useContext(OptionsContext);
    const {options, dispatch} = context;
    
    return <Popover>
        <PopoverTrigger asChild>
            <Button className="flex-shrink-0 z-20 text-2xl" size={"icon"} variant={"ghost"}>
                <i className="bi-gear"></i>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1">
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
