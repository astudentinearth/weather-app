import { Skeleton } from "@/components/ui/skeleton";

export function HourlySkeleton(){
    const render = ()=>{
        const elements:JSX.Element[] = [];
        for(let i=0;i<24;i++){
            elements.push(
                <div className="flex flex-col gap-2 items-center">
                    <Skeleton className="w-12 h-4"></Skeleton>
                    <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
                    <Skeleton className="w-24 h-4"></Skeleton>
                    <Skeleton className="w-16 h-2"></Skeleton>
                </div>
            )
        }
        return elements
    }
    return <div className="flex gap-2">
        {render()}
    </div>
}