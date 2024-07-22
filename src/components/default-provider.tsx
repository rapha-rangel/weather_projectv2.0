"use client"
import {ReactNode} from "react";
// import StyledComponentsRegistry from "@/components/registry";
import { SearchContextProvider } from "@/contexts/search-context";
import { SelectCityContextProvider } from "@/contexts/select-city-context";
import { LocalStorageContextProvider } from "@/contexts/local-storage-context";

interface DefaultProviderProps {
  children: ReactNode;
}

export  function DefaultProvider({children}: DefaultProviderProps) {
  
  
  return (
    <LocalStorageContextProvider>
      <SearchContextProvider>
        <SelectCityContextProvider>
          {children}
        </SelectCityContextProvider>
      </SearchContextProvider>
    </LocalStorageContextProvider>
    
  )
}