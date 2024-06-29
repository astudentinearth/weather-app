import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { geocode } from "@/lib/weatherAPI";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "@/lib";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import locate from "@/lib/geolocation";

export default function LocationSearchDialog(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const navigate = useNavigate();
    const {t} = useTranslation();
    useEffect(()=>{
        const search = setTimeout(async ()=>{
            const res = await geocode(query);
            if(res) setResults(res)
            else setResults([])
        },200);
        return ()=>clearTimeout(search);
    },[query]);
    const renderItems = useCallback(()=>{
        return results.map((l)=>{
            return <DialogClose asChild>
                <Button variant={"ghost"} className={cn("border-none text-start justify-start")} onClick={()=>{
                    navigate({
                        pathname: '/',
                        search: `?latitude=${l.latitude}&longitude=${l.longitude}&name=${l.name}`
                    })
                }}>
                    <div>
                        <span>{l.name}</span>&nbsp;&nbsp;&nbsp;
                        <span className="text-muted-foreground">{l.country ?? ""}</span>
                    </div>
                </Button>
            </DialogClose>
        })
    },[results]);
    const autoLocate = ()=>{
        locate().then((pos)=>{
            navigate({
                pathname: '/',
                search: `?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&autoLocated=true`
            })
        })
    }
    return <Dialog>
        <DialogTrigger asChild>
            <Button className="flex-shrink-0 z-20 text-2xl" size={"icon"} variant={"ghost"}>
                <i className="bi-search"></i>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-full p-0 fixed top-[200px] rounded-xl bg-background backdrop-blur-md">
            <Input onChange={(e)=>{setQuery(e.target.value)}} placeholder={t("ui.search_location_placeholder")} className="rounded-lg border-none bg-transparent"></Input>
            <div className="absolute flex backdrop-blur-md flex-col max-h-[512px] top-[120%] bg-background w-full rounded-xl border-border border empty:border-none">
                <DialogClose asChild>
                    <Button variant={"ghost"} className={cn("border-none text-start justify-start", results.length > 0 ? "hidden" : "block")} onClick={autoLocate}>
                            <div>
                                <i className="bi-geo-alt"></i>&nbsp;&nbsp;
                                <span className="font-bold">{t("ui.auto_detect_location_action")}</span>
                            </div>
                    </Button>
                </DialogClose>
                {query.trim()=="" ? 
                <></> :
                renderItems()}
            </div>
        </DialogContent>
    </Dialog>
}