import { ReactNode, createContext, useState } from "react";
import {GrausFilterTypes} from '@/types/graus-filter-types'
import {DarkModeTypes} from '@/types/dark-mode-types';

export const SearchContext = createContext({
  search:"",
  setSearch: (value: string)=> {},
  graus: GrausFilterTypes.CELSIUS,
  setGraus: (value: GrausFilterTypes)=> {},
  darkMode:DarkModeTypes.DARK,
  setDarkMode:(value:DarkModeTypes)=> {}
})

interface ProviderProps{
  children: ReactNode
}

export function SearchContextProvider({children}: ProviderProps){
  const [search, setSearch]= useState("");
  const [graus, setGraus]= useState(GrausFilterTypes.CELSIUS);
  const [darkMode, setDarkMode]= useState(DarkModeTypes.DARK);

  return(
    <SearchContext.Provider
      value={{
        search,setSearch,
        graus, setGraus,
        darkMode, setDarkMode
      }}>
      {children}
    </SearchContext.Provider>
  )
}