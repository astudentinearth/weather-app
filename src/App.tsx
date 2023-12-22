import { useLayoutEffect, useReducer } from "react"
import { Options, OptionsContext, PrefActions, defaultOptions, optionsReducer } from "@/context"
import Layout from "./Layout";

function App() {
  const [options, dispatch] = useReducer(optionsReducer, defaultOptions);
  useLayoutEffect(()=>{
    const opts_str = localStorage.getItem("options");
    if(opts_str==null) localStorage.setItem("options",JSON.stringify(defaultOptions));
    else{
      const opts:Options = JSON.parse(opts_str);
      dispatch({type: PrefActions.SET_OPTIONS, value: opts});
    }
  },[])
  return (
    <OptionsContext.Provider value={{dispatch, options}}>
        <Layout></Layout>
    </OptionsContext.Provider>
  )
}

export default App
