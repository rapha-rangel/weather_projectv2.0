import { useOpenModal } from "@/hooks/useOpenModal";
import { ReactNode } from "react";
import styled from "styled-components";

interface BoxType {
  $open: boolean
}
interface LayoutProps{
  children: ReactNode
}

export const Box = styled.div<BoxType>`
  min-height: 100vh;
  background-color: ${props=> props.theme.color.background.body};
  color: ${props=> props.theme.color.text};
  opacity:${props=> props.$open?0.6:1};
  filter:${props=> props.$open?"blur(2px)":"blur(0px)"};
  padding: 30px ;
  margin: auto;
  transition: all 1s;
  @media (min-width: ${props=> props.theme.layoutBreakpoint}){
    padding:30px 5% ;
  }
`

export function DefaultLayout({children}: LayoutProps){
  const {openModal} = useOpenModal();
  return (
    <Box
      $open={openModal}>
      {children}
    </Box>
  )
}