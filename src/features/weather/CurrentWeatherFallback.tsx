import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { Frown, RotateCw } from "lucide-react";
import { FallbackProps } from "react-error-boundary";


export default function CurrentWeatherFallback({error, resetErrorBoundary}:FallbackProps){
    const msg = (error instanceof Error) ? error.message : t("errors.no_error_message");
    return <div className="current-weather-widget transition-[font-size,transform] duration-100 text-2xl sm:text-4xl z-20 flex flex-col items-center justify-center gap-4 py-6">
        <Frown size={48}/>
        <span className="text-center">{t("errors.something_went_wrong")}</span>
        <span className="text-center text-lg text-foreground/50">{t("errors.refresh_page")}</span>
        <Button variant={"outline"} className="rounded-lg gap-2 p-4 text-lg" onClick={()=>{resetErrorBoundary()}}>
            <RotateCw size={20}></RotateCw>
            {t("errors.retry_button")}</Button>
        <span className="text-center text-muted-foreground text-lg bg-destructive/10 p-4 rounded-lg">
            {msg}
        </span>
    </div>
}