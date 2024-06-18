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
    return <div className="text-white overflow-x-hidden">
        <RouterProvider router={router}></RouterProvider>
    </div>
}