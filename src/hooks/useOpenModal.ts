import { OpenModalContext } from "@/contexts/open-modal-search";
import { useContext } from "react";

export function useOpenModal(){
  return useContext(OpenModalContext)
}