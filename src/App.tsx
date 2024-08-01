import { Options } from "@/context";
import { useLayoutEffect } from "react";
import Layout from "./Layout";
import { useOptionsStore } from "./context/use-options-store";

function App() {
  const overwrite = useOptionsStore((state)=>state.overwrite);
  useLayoutEffect(()=>{
    const opts_str = localStorage.getItem("options");
    if(opts_str){
        const obj = JSON.parse(opts_str)
        if("state" in obj) return; // we are using zustand
        const opts:Options = obj as Options;
        overwrite({...opts});
        localStorage.removeItem("options"); // remove old key
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Layout></Layout>
  )
}

export default App
