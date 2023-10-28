import { Link } from "react-router-dom";

export default function Navigation(){
    return <div className={`fixed bg-slate-1 bottom-2 left-[50%] translate-x-[-50%] rounded-2xl flex justify-center gap-2 p-2
                            sm:static sm:w-60 sm:translate-x-0 sm:flex-col`}>
        <NavigationButton href="/" icon="bi-house-door" activeIcon="bi-house-door-fill" name="Home"></NavigationButton>
        <NavigationButton href="/locations" icon="bi-geo-alt" activeIcon="bi-geo-alt-fill" name="Locations"></NavigationButton>
        <NavigationButton href="/settings" icon="bi-gear" activeIcon="bi-gear-fill" name="Settings"></NavigationButton>
    </div>
}

function NavigationButton(props:{name: string, icon: string, href: string, activeIcon: string}){
    const location = window.location;
    const {href, name, icon, activeIcon} = props;
    const active = location.pathname === href;
    return <Link to={href} className={`rounded-lg place-items-center grid transition-[background,filter]
    text-2xl w-12 h-12 sm:w-auto ${active ? "bg-slate-2" : "bg-transparent"} ${active ? "hover:brightness-110" : "hover:bg-slate-2/50"}
    sm:grid-cols-[24px_auto] gap-4 sm:pl-3`}>
    <i data-testid="nav-icon" className={`${active ? activeIcon : icon} justify-self-center self-center`}></i>
    <span data-testid="nav-text" className="hidden sm:inline justify-self-start">{name}</span>
</Link>
}