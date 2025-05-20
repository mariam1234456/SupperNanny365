import { createContext,useEffect,useState } from "react";
export let TokenContext =createContext();
export default function TokenContextProvider(props){
    const [token, setToken] = useState({
        access: null,
        refresh: null,
      });
      useEffect(() => {
    
    
        if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
          setToken({
            access: localStorage.getItem("accessToken"),
            refresh: localStorage.getItem("refreshToken"),
          });
        }
      }, []);
    return <TokenContext.Provider value={{token,setToken}}>
        {props.children}
    </TokenContext.Provider>
}
