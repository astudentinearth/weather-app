import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function LanguageSelect(){
    const {t, i18n} = useTranslation();
    return <Select value={i18n.resolvedLanguage} onValueChange={(e)=>{
        i18n.changeLanguage(e);
    }}>
        <SelectTrigger>
            <SelectValue placeholder={t("ui.language_selector_label")}></SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="tr">Türkçe</SelectItem>
        </SelectContent>
    </Select>
}