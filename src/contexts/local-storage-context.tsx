"use client"

import { useEffect, createContext, useState, ReactNode, SetStateAction} from "react";
import {WeatherOtherCitiesTypes} from '@/types/wheather-types'
interface LocalStorageContextType{
  items: WeatherOtherCitiesTypes[];
  updateLocalStorage:(value: WeatherOtherCitiesTypes[])=>void
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  items:[],
  updateLocalStorage:(value: WeatherOtherCitiesTypes[])=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function LocalStorageContextProvider({children}: ProviderProps){

  const [items, setItems] = useState<WeatherOtherCitiesTypes[]>([]);

  useEffect(() => {
    if( typeof window === "undefined") return;
    let value = window.localStorage.getItem("cities-items")
    if(value){ 
      setItems(JSON.parse(value));
    }
  }, [])

  const updateLocalStorage =(value:WeatherOtherCitiesTypes[])=>{
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