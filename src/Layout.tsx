import { createHashRouter, RouterProvider } from "react-router-dom";
import Navigation from "./features/navigation";
import WeatherPage from "./features/pages/weather/WeatherPage";
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
    element: <Navigation></Navigation>
}])


export default function Layout(){
    return <div className="text-white ">
        <RouterProvider router={router}></RouterProvider>
        
    </div>
}