import { useReducer } from "react"
import { OptionsContext, defaultOptions, optionsReducer } from "./context/OptionsReducer"

function App() {
  const [options, dispatch] = useReducer(optionsReducer, defaultOptions);
  return (
    <OptionsContext.Provider value={{dispatch, options}}>
      <h1>hello world</h1>
    </OptionsContext.Provider>
  )
}

export default App
