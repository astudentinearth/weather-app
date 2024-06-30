import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { geocode } from "@/lib/weatherAPI";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "@/lib";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import locate from "@/lib/geolocation";
import { OptionsContext } from "@/context";
import { LocationItem } from "./LocationItem";

export default function LocationSearchDialog(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const navigate = useNavigate();
    const {options} = useContext(OptionsContext);
    const {t, i18n} = useTranslation();
    useEffect(()=>{
        const search = setTimeout(async ()=>{
            const res = await geocode(query, i18n.resolvedLanguage);
            if(res) setResults(res)
            else setResults([])
        },200);
        return ()=>clearTimeout(search);
    },[query]);
    const renderResults = useCallback((items: Location[])=>{
        return items.map((l, i)=>{
            return <LocationItem location={l} key={i}></LocationItem>
        })
    },[results]);
    const renderRecents = useCallback((items: Location[])=>{
        return items.map((l, i)=>{
            return <DialogClose key={i} asChild>
                <LocationItem location={l} recent key={i}></LocationItem>
            </DialogClose>
        })
    },[options.locations]);
    const autoLocate = ()=>{
        locate().then((pos)=>{
            navigate({
                pathname: '/',
                search: `?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&autoLocated=true`
            })
        })
    }
    return <Dialog onOpenChange={(open)=>{
        if(!open) {
            setResults([]);
            setQuery("");
        }
    }}>
        <DialogTrigger asChild>
            <Button className="flex-shrink-0 z-20 text-2xl" size={"icon"} variant={"ghost"}>
                <i className="bi-search"></i>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-full p-0 fixed top-[200px] rounded-xl bg-background backdrop-blur-md">
            <Input tabIndex={0} onChange={(e)=>{setQuery(e.target.value)}} placeholder={t("ui.search_location_placeholder")} className="rounded-xl border-none bg-transparent"></Input>
            <div className="absolute flex backdrop-blur-md flex-col max-h-[512px] top-[120%] bg-background w-full rounded-xl border-border border empty:border-none overflow-y-auto">
                <DialogClose asChild>
                    <Button variant={"ghost"} className={cn("border-none text-start justify-start", results.length > 0 ? "hidden" : "block")} onClick={autoLocate}>
                            <div>
                                <i className="bi-geo-alt"></i>&nbsp;&nbsp;
                                <span className="font-bold">{t("ui.auto_detect_location_action")}</span>
                            </div>
                    </Button>
                </DialogClose>
                {query.trim()=="" ? 
                <>
                    <hr className={cn(options.locations.length == 0 ? "hidden" : "")}></hr>
                    <span className={cn("px-4 pt-2 pb-1 select-none", options.locations.length == 0 ? "hidden" : "inline")}>{t("ui.recent_locations_title")}</span>
                    {renderRecents(options.locations)}
                </> :
                renderResults(results)}
            </div>
        </DialogContent>
    </Dialog>
}