import { LocalStorageContext } from "@/contexts/local-storage-context";
import { useContext } from "react";

export function useLocalStorage(){
  return useContext(LocalStorageContext)
}