"use client"

import styled from "styled-components";
import { SearchBar } from "./search-bar";
import { ButtonSelect } from "./button-select";
import { useSearch } from "@/hooks/useSearch";
import { SunIcon, MoonIcon } from "@/icons/icons";


export const Box = styled.section`
  width: 100%;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  background-color: transparent;
  transition: all 1s;
`
export const ButtonsBox = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
`
export function Header() {
  const{graus, setGraus,darkMode, setDarkMode} =useSearch();
  return (
    <Box>
      <SearchBar/>
      <ButtonsBox>
        <ButtonSelect
          context={graus}
          handleContext={setGraus}
          iconLeft={{icon:"°C", color:""}}
          iconRight={{icon:"°F", color:""}}
        />
        <ButtonSelect
          context={darkMode}
          handleContext={setDarkMode}
          iconLeft={{icon:SunIcon, color:"sun"}}
          iconRight={{icon:MoonIcon, color:"moon"}}
        />
      </ButtonsBox>
    </Box>
  )
}

