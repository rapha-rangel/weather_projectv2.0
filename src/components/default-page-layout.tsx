"use client"

import styled from "styled-components";


export const DefaultLayout = styled.div`
  min-height: 100vh;
  background-color: ${props=> props.theme.color.background.body};
  color: ${props=> props.theme.color.text};
  /* opacity: 0.6;
  filter: blur(2px); */
  padding: 30px ;
  margin: auto;
  transition: all 1s;
  @media (min-width: ${props=> props.theme.layoutBreakpoint}){
    padding:30px 5% ;
  }
`