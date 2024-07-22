"use client"

import styled from "styled-components";
import { SearchBar } from "./search-bar";
import { ButtonSelect } from "./button-select";
import { DarkButtonSelect } from "./dark-button-select";

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
  return (
    <Box>
      <SearchBar/>
      <ButtonsBox>
        <ButtonSelect/>
        <DarkButtonSelect/>
      </ButtonsBox>
    </Box>
  )
}

