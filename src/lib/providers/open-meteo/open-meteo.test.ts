import OpenMeteoAPI from "./open-meteo";
import { Location } from "@/lib";
// let remoteAccessible=false;

const { getCurrentWeather, getDailyWeather, getHourlyWeather, locationSearch } = OpenMeteoAPI;
/** Location of İstanbul */
const _ist: Location = {
    name: "Istanbul",
    country: "Türkiye",
    latitude: 41.01384,
    longitude: 28.94966
};

async function isAPIAccessible(){
    try{
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41");
        const data = await res.json();
        if(data.elevation != null){
            // remoteAccessible= true;
            console.log("API accessible. Proceeding with tests");
            return true;
        }
    }
    catch(error){
        console.warn("Skipping API tests because remote is unreachable.");
        // remoteAccessible = false;
        return false;
    }
}

describe.skipIf(!(await isAPIAccessible()))("open meteo",async ()=>{
    it("api: check if current weather data is correctly received",async ()=>{
        const data = await getCurrentWeather(_ist);
        assert.isNotNull(data, "data should not be null");
    })
    it("api: check if hourly weather data is currectly received", async ()=>{
        const data = await getHourlyWeather(_ist);
        assert.isNotNull(data, "data should not be null")
    })
    it("api: check if daily weather data is currectly received", async ()=>{
        const data = await getDailyWeather(_ist);
        assert.isNotNull(data, "data should not be null")
    })
    it("api: check if locations can be searched", async ()=>{
        const data = await locationSearch("istanbul");
        expect(data?.length).toBeGreaterThan(0);
        console.log(data);
    })
})