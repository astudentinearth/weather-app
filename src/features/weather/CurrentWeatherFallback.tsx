import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { FallbackProps } from "react-error-boundary";


export default function CurrentWeatherFallback({error, resetErrorBoundary}:FallbackProps){
    const msg = (error instanceof Error) ? error.message : t("errors.no_error_message");
    return <div className="current-weather-widget transition-[font-size,transform] duration-100 text-2xl sm:text-4xl z-20 flex flex-col items-center justify-center gap-1 py-6">
        <i className="bi-emoji-frown text-[48px]"></i>
        <span className="text-center">{t("errors.something_went_wrong")}</span>
        <span className="text-center text-lg">{t("errors.refresh_page")}</span>
        <Button variant={"outline"} className="rounded-xl" onClick={()=>{resetErrorBoundary()}}>
            <i className="bi-arrow-clockwise "></i>
            {t("errors.retry_button")}</Button>
        <span className="text-center text-muted-foreground text-lg bg-destructive/10 p-4 rounded-lg">
            {msg}
        </span>
    </div>
}