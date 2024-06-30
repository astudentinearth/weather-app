import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Location } from "@/lib";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OptionsContext, PrefActions } from "@/context";

export function LocationItem(props: { location: Location; recent?: boolean; }) {
    const l = props.location;
    const navigate = useNavigate();
    const { dispatch } = useContext(OptionsContext);
    return <DialogClose asChild>
        <div tabIndex={0} className={cn("border-none text-start justify-center h-auto px-4 hover:bg-primary/50 focus:bg-primary outline-none cursor-pointer inline-flex items-center transition-colors py-2")} onClick={() => {
            dispatch({ type: PrefActions.ADD_LOCATION, value: l });
            navigate({
                pathname: '/',
                search: `?latitude=${l.latitude}&longitude=${l.longitude}&name=${l.name}`
            });
        } }>
            <div className="flex w-full items-center">
                <div className="w-full">
                    <div className="flex items-center gap-2 flex-grow">
                        <img width={24} height={8} alt={l.country} className=" float-left"
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${l.countryCode?.toUpperCase()}.svg`} />
                        <span>{l.name}</span>
                        <span className="text-muted-foreground">{l.country ?? ""}</span>
                    </div>
                    <span className="text-muted-foreground">{l.admins}</span>
                </div>
                <Button className={cn("flex-shrink-0 w-8 h-8 bg-transparent", !props.recent && "hidden")} onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: PrefActions.REMOVE_LOCATION, value: l });
                } }>
                    <i className="bi-x-lg"></i>
                </Button>
            </div>
        </div>
    </DialogClose>;
}
