/** @deprecated  */
import Navigation from "@/features/navigation";
import { Location } from "@/lib";
import { geocode } from "@/lib/weatherAPI";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LocationsPage(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const search = setTimeout(async ()=>{
            const res = await geocode(query);
            if(res) setResults(res)
            else setResults([])
        },500);
        return ()=>clearTimeout(search);
    },[query]);
    const renderItems = useCallback(()=>{
        return results.map((l)=>{
            return <div onClick={()=>{
                navigate({
                    pathname: '/',
                    search: `?latitude=${l.latitude}&longitude=${l.longitude}`
                })
            }}>{l.name}, ${l.country ?? ""}</div>
        })
    },[results]);
    return <div className="page">
        <Navigation></Navigation>
        <div className="flex flex-col p-2 gap-1 text-2xl">
            <div className="bg-slate-1 flex rounded-xl hover:brightness-110 focus-within:brightness-105 transition-[filter]">
                <i className="bi-search m-2"></i>
                <input onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search" className="bg-transparent py-2 w-full ml-2 outline-none"></input>
            </div>
            {query.trim()=="" ? 
            <></> :
            renderItems()}
        </div>
    </div>
}