import { ReactNode, createContext, useState } from "react";

export const OpenModalContext = createContext({
  openModal:false,
  setOpenModal: (value: boolean)=> {},
})

interface ProviderProps{
  children: ReactNode
}

export function OpenModalContextProvider({children}: ProviderProps){
  const [openModal, setOpenModal]= useState(false);

  return(
    <OpenModalContext.Provider
      value={{
        openModal,setOpenModal
      }}>
      {children}
    </OpenModalContext.Provider>
  )
}