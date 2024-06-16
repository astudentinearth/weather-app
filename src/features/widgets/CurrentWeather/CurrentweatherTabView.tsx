import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function CurrentWeatherTabView(){
    return <Tabs defaultValue="hourly" className={cn("bg-background border-2 border-border rounded-2xl hidden sm:block")}>
        <TabsList className={cn("bg-transparent p-0")}>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="wind">Wind</TabsTrigger>
            <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
        </TabsList>
        <TabsContent value="hourly">
            <h1>Hourly</h1>
        </TabsContent>
        <TabsContent value="daily">
            <h1>Daily</h1>
        </TabsContent>
        <TabsContent value="wind">
            <h1>Wind</h1>
        </TabsContent>
        <TabsContent value="precipitation">
            <h1>Precipitation</h1>
        </TabsContent>
    </Tabs>
}
