import { Location } from "@/lib";

export function MobileLocationItem(props: {location: Location}){
    const {location} = props;
    return <div>
        {location.name}
    </div>
}