"use client"
import { ReactNode, createContext, useState } from "react";
import {SelectCityTypes} from '@/types/geocode-types';
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const SelectCityContext = createContext({
  infoCity:{
    lat:0,
    long: 0,
    city:"",
    country:""
  },
  setInfoCity:(value:SelectCityTypes)=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function SelectCityContextProvider({children}: ProviderProps){
  const [infoCity, setInfoCity]= useState<SelectCityTypes>({
    lat:0,
    long: 0,
    city:"",
    country:""
  });

  return(
    <SelectCityContext.Provider
      value={{
        infoCity, setInfoCity
      }}>
      {children}
    </SelectCityContext.Provider>
  )
}