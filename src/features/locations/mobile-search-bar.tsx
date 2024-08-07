import { useOptionsStore, useWeatherStore } from "@/context";
import { cn, geocode, Location } from "@/lib";
import { useTranslation } from "react-i18next";
import SettingsPopover from "../settings/SettingsPopover";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import locate from "@/lib/geolocation";
import { LocationItem } from "./LocationItem";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

export function MobileSearchBar(){
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const location = useWeatherStore((state)=>state.current?.location);
    const {t, i18n} = useTranslation();
    const name = location?.isAutoDetected ? t("ui.auto_detected_location_name") : location?.name;
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const locations = useOptionsStore((state)=>state.locations)
    const handleOpenChange = (open: boolean)=>{
        setSearchOpen(open);
        if(open){
            inputRef.current?.focus();
        }
    }
    useHotkeys("ctrl+k", ()=>{
        const w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        if(w < 640){
            setSearchOpen(!searchOpen);
        }
    }, {preventDefault: true})
    useEffect(()=>{
        if(!searchOpen) {
            setResults([]);
            setQuery("");
            if(inputRef.current) inputRef.current.value = "";
        }
    }, [searchOpen])

    useEffect(()=>{
        const search = setTimeout(async ()=>{
            const res = await geocode(query, i18n.resolvedLanguage);
            if(res) setResults(res)
            else setResults([])
        },200);
        return ()=>clearTimeout(search);
    },[query, i18n.resolvedLanguage]);

    const renderResults = useCallback(()=>{
        return results.map((l, i)=><div onClick={()=>setSearchOpen(false)}>
            <LocationItem key={i} location={l}></LocationItem>
        </div>)
    },[results]);
    const renderRecents = useCallback(()=>{
        return locations.map((l, i)=><div onClick={()=>setSearchOpen(false)}>
            <LocationItem recent key={i} location={l}></LocationItem>
        </div>)
    },[locations]);
    const autoLocate = ()=>{
        setSearchOpen(false);
        locate().then((pos)=>{
            navigate({
                pathname: '/',
                search: `?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&autoLocated=true`
            })
        })
    }

    return <Popover open={searchOpen} onOpenChange={handleOpenChange} modal>
        <div className={cn("bg-background border border-border m-2 h-12 rounded-xl flex items-center sm:hidden transition-colors", searchOpen && "bg-secondary")}>
            <PopoverTrigger className="w-full">
                    <span onClick={()=>{setSearchOpen(true)}} className={cn("text-foreground/75 pl-3 text-lg h-full flex gap-2 items-center", searchOpen && "hidden")}>
                        <MapPin className="inline" size={24}></MapPin>
                        {name ?? ""}
                    </span>
                    <div onClick={()=>{setSearchOpen(true)}} className={cn("flex-grow h-full", searchOpen && "hidden")}></div>
                    <Input placeholder={t("ui.search_location_placeholder")} onChange={(e)=>{setQuery(e.target.value)}} ref={inputRef} onClick={(e)=>{e.stopPropagation()}} className={cn("hidden text-lg pl-3 w-full bg-transparent border-none", searchOpen && "block")}></Input>
            </PopoverTrigger>
            {searchOpen ? <></> : <SettingsPopover triggerTestID="mobile-settings-popover-trigger"></SettingsPopover>}
        </div>
        <PopoverContent onOpenAutoFocus={(e)=>{e.preventDefault(); inputRef.current?.focus()}} className="popover-match-trigger-width p-0 mt-1 max-h-[50vh] overflow-x-clip overflow-y-auto">
            <Button variant={"ghost"} className={cn("border-none text-start justify-start w-full", results.length > 0 ? "hidden" : "block")} onClick={autoLocate}>
                <div>
                    <Navigation size={16} className="inline translate-y-[-10%]"></Navigation>&nbsp;&nbsp;
                    <span className="font-bold">{t("ui.auto_detect_location_action")}</span>
                </div>
            </Button>
            {query.trim()=="" ? 
                <>
                    <hr className={cn("pb-2", locations.length == 0 ? "hidden" : "")}></hr>
                    <span className={cn("block px-3 pb-1 select-none mt-2", locations.length == 0 ? "hidden" : "inline")}>{t("ui.recent_locations_title")}</span>
                    {renderRecents()}
                </> :
                renderResults()}
        </PopoverContent>
    </Popover>
}