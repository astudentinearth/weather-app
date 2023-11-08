import { useReducer, useState } from "react"
import { OptionsContext, WeatherContext, defaultOptions, optionsReducer } from "@/context"
import Layout from "./Layout";
import { WeatherState } from "@/lib";

function App() {
  const [options, dispatch] = useReducer(optionsReducer, defaultOptions);
  const [weatherState, setWeatherState] = useState<WeatherState>({} as WeatherState);
  return (
    <OptionsContext.Provider value={{dispatch, options}}>
      <WeatherContext.Provider value={{weatherState, setWeatherState}}>
        <Layout></Layout>
      </WeatherContext.Provider>
    </OptionsContext.Provider>
  )
}

export default App
