import { createHashRouter, RouterProvider } from "react-router-dom";
import WeatherPage from "./features/pages/weather/WeatherPage";
const router = createHashRouter([{
  path: '/',
  element: <WeatherPage></WeatherPage>
}])


export default function Layout(){
    return <div className="text-white overflow-x-hidden">
        <RouterProvider router={router}></RouterProvider>
    </div>
}