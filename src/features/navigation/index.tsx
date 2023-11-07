import { Link } from "react-router-dom";
import { IconClassnames } from "./types";
import { useTranslation } from "react-i18next";

/** Navigation/sidebar of the main UI. Converts to a floating side pane in large screens and an icon navigation bar in small screens. */
export default function Navigation(){
    const {t} = useTranslation();
    return <div className={`fixed bg-slate-1 bottom-2 left-[50%] translate-x-[-50%] rounded-2xl flex justify-center gap-2 p-2
                            sm:static sm:w-60 sm:translate-x-0 sm:flex-col`}>
        <NavigationButton href="/" icon={IconClassnames.HOME_INACTIVE} activeIcon={IconClassnames.HOME_ACTIVE} name={t("navigation.home")}></NavigationButton>
        <NavigationButton href="/locations" icon={IconClassnames.LOCATIONS_INACTIVE} activeIcon={IconClassnames.LOCATIONS_ACTIVE} name={t("navigation.locations")}></NavigationButton>
        <NavigationButton href="/settings" icon={IconClassnames.SETTINGS_INACTIVE} activeIcon={IconClassnames.SETTINGS_ACTIVE} name={t("navigation.settings")}></NavigationButton>
    </div>
}

/** Link with an icon and a name. Used in the navigation pane. A wrapper for react router link component.  */
function NavigationButton(props:{name: string, icon: string, href: string, activeIcon: string}){
    const location = window.location;
    const {href, name, icon, activeIcon} = props;
    const active = location.pathname === href; // check for the route. if the button is for this route, change style
    return <Link data-testid="nav-link" to={href} className={`rounded-lg place-items-center grid transition-[background,filter]
    text-2xl w-12 h-12 sm:w-auto ${active ? "bg-slate-2" : "bg-transparent"} ${active ? "hover:brightness-110" : "hover:bg-slate-2/50"}
    sm:grid-cols-[24px_auto] gap-4 sm:pl-3`}>
    <i data-testid="nav-icon" className={`${active ? activeIcon : icon} justify-self-center self-center`}></i>
    <span data-testid="nav-text" className="hidden sm:inline justify-self-start">{name}</span>
</Link>
}