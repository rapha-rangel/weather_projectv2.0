import { useEffect, createContext, useState, ReactNode} from "react";
import {WeatherLocalStorageTypes} from '@/types/wheather-types'
interface LocalStorageContextType{
  items: WeatherLocalStorageTypes[];
  updateLocalStorage:(value: WeatherLocalStorageTypes[])=>void
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  items:[],
  updateLocalStorage:(value: WeatherLocalStorageTypes[])=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function LocalStorageContextProvider({children}: ProviderProps){

  const [items, setItems] = useState<WeatherLocalStorageTypes[]>([]);

  useEffect(() => {
    if( typeof window === "undefined") return;
    let value = window.localStorage.getItem("cities-items")
    if(value){ 
      setItems(JSON.parse(value));
    }
  }, [])

  const updateLocalStorage =(value:WeatherLocalStorageTypes[])=>{
    setItems(value);
    localStorage.setItem("cities-items", JSON.stringify(value));
  }

  return (
    <LocalStorageContext.Provider
      value={{
        items, 
        updateLocalStorage
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}