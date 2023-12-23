import Navigation from "@/features/navigation";

export function LocationsPage(){
    return <div className="page">
        <Navigation></Navigation>
        <div className="flex flex-col p-2 gap-1 text-2xl">
            <div className="bg-slate-1 flex rounded-xl hover:brightness-110 focus-within:brightness-105 transition-[filter]">
                <i className="bi-search m-2"></i>
                <input placeholder="Search" className="bg-transparent py-2 w-full ml-2 outline-none"></input>
            </div>
            
        </div>
    </div>
}