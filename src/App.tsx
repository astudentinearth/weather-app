import { useReducer } from "react"
import { OptionsContext, defaultOptions, optionsReducer } from "@/context"
import Layout from "./Layout";

function App() {
  const [options, dispatch] = useReducer(optionsReducer, defaultOptions);
  return (
    <OptionsContext.Provider value={{dispatch, options}}>
        <Layout></Layout>
    </OptionsContext.Provider>
  )
}

export default App
