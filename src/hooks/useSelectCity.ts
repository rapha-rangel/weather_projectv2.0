
import { SelectCityContext } from "@/contexts/select-city-context";
import { useContext } from "react";

export function useSelectCity(){
  return useContext(SelectCityContext)
}