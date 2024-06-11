import { createHashRouter, RouterProvider } from "react-router-dom";
import Navigation from "./features/navigation";
import WeatherPage from "./features/pages/weather/WeatherPage";
import { LocationsPage } from "./features/pages/locations";
import { cn } from "./lib/utils";
const router = createHashRouter([{
  path: '/',
  element: <WeatherPage></WeatherPage>
},
{
    path: '/settings',
    element: <Navigation></Navigation>
},
{
    path: '/locations',
    element: <LocationsPage></LocationsPage>
}])


export default function Layout(){
    return <div className="text-white ">
        <div className={cn("absolute rounded-[50%] blur-[128px] opacity-25 left-[50%] translate-x-[-50%] top-[-768px] sm:top-[-512px] w-[1266px] h-[1266px] glow")}>sd</div>
        <RouterProvider router={router}></RouterProvider>
    </div>
}