import { createHashRouter, RouterProvider } from "react-router-dom";
import { CurrentWeatherWidget } from "@/features/weather";
import { useTranslation } from "react-i18next";
import {ErrorBoundary} from "react-error-boundary"
import CurrentWeatherFallback from "./features/weather/CurrentWeatherFallback";

const router = createHashRouter([{
  path: '/',
  element: <WeatherPage></WeatherPage>
}])

export function WeatherPage(){
    const {t} = useTranslation();
    return <div className="page flex flex-col sm:p-2 sm:justify-center sm:items-center overflow-x-hidden">
        <div className="w-full max-w-[900px]">
            <ErrorBoundary FallbackComponent={CurrentWeatherFallback}>
                <CurrentWeatherWidget></CurrentWeatherWidget>
            </ErrorBoundary>
        </div>
        <span className="text-sm text-muted-foreground text-center">
                <a className="hover:text-muted-foreground-hover transition-colors" href="https://open-meteo.com/">{t("ui.attribution_text")}</a>
                <a className="hover:text-muted-foreground-hover transition-colors" href="https://creativecommons.org/licenses/by/4.0/"> | CC BY 4.0</a>
        </span>
    </div>
}

export default function Layout(){
    return <div className="text-white overflow-x-hidden">
        <RouterProvider router={router}></RouterProvider>
    </div>
}