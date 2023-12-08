import { getCurrentWeather } from "./open-meteo";
import { Location } from "@/lib";
// let remoteAccessible=false;

/** Location of İstanbul */
const _ist: Location = {
    name: "Istanbul",
    country: "Türkiye",
    latitude: 41.01384,
    longtitude: 28.94966
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
    it("api: check if weather data is correctly received",async ()=>{
        const data = await getCurrentWeather(_ist);
        assert.isNotNull(data, "data should not be null");
    })
})