import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useOptionsStore } from "@/context/use-options-store";
import { Location } from "@/lib";
import locate from "@/lib/geolocation";
import { cn } from "@/lib/utils";
import { geocode } from "@/lib/weatherAPI";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LocationItem } from "./LocationItem";
import { Navigation, Search } from "lucide-react";

export default function LocationSearchDialog(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const navigate = useNavigate();
    const locations = useOptionsStore((state)=>state.locations)
    const {t, i18n} = useTranslation();
    useEffect(()=>{
        const search = setTimeout(async ()=>{
            const res = await geocode(query, i18n.resolvedLanguage);
            if(res) setResults(res)
            else setResults([])
        },200);
        return ()=>clearTimeout(search);
    },[query, i18n.resolvedLanguage]);
    const renderResults = useCallback(()=>{
        return results.map((l, i)=>{
            return<DialogClose key={i} className="w-full">
                <LocationItem location={l} key={i}></LocationItem>
            </DialogClose>
        })
    },[results]);
    const renderRecents = useCallback(()=>{
        return locations.map((l, i)=>{
            return <DialogClose key={i} className="w-full">
                <LocationItem location={l} recent></LocationItem>
            </DialogClose>
        })
    },[locations]);
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
                <Search></Search>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-full p-0 fixed top-[200px] rounded-xl bg-background backdrop-blur-md">
            <Input tabIndex={0} onChange={(e)=>{setQuery(e.target.value)}} placeholder={t("ui.search_location_placeholder")} className="rounded-xl border-none bg-transparent"></Input>
            <div className="absolute flex backdrop-blur-md flex-col max-h-[512px] top-[120%] bg-background w-full rounded-xl border-border border empty:border-none overflow-y-auto">
                <DialogClose asChild>
                    <Button variant={"ghost"} className={cn("border-none text-start justify-start", results.length > 0 ? "hidden" : "block")} onClick={autoLocate}>
                            <div>
                                <Navigation size={16} className="inline translate-y-[-10%]"></Navigation>&nbsp;&nbsp;
                                <span className="font-bold">{t("ui.auto_detect_location_action")}</span>
                            </div>
                    </Button>
                </DialogClose>
                {query.trim()=="" ? 
                <>
                    <hr className={cn(locations.length == 0 ? "hidden" : "")}></hr>
                    <span className={cn("px-4 pt-2 pb-1 select-none", locations.length == 0 ? "hidden" : "inline")}>{t("ui.recent_locations_title")}</span>
                    {renderRecents()}
                </> :
                renderResults()}
            </div>
        </DialogContent>
    </Dialog>
}