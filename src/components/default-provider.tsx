"use client"
import {ReactNode} from "react";
import { SearchContextProvider } from "@/contexts/search-context";
import { SelectCityContextProvider } from "@/contexts/select-city-context";
import { LocalStorageContextProvider } from "@/contexts/local-storage-context";
import { OpenModalContextProvider } from "@/contexts/open-modal-search";

interface DefaultProviderProps {
  children: ReactNode;
}

export  function DefaultProvider({children}: DefaultProviderProps) {
  return (
    <LocalStorageContextProvider>
      <OpenModalContextProvider>
        <SearchContextProvider>
          <SelectCityContextProvider>
            {children}
          </SelectCityContextProvider>
        </SearchContextProvider>
      </OpenModalContextProvider>
    </LocalStorageContextProvider>
  )
}