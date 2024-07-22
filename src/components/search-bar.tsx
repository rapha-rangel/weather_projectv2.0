"use client"
import styled from "styled-components";
import { SearchIcon } from "@/icons/icons";
import { useSearch } from "@/hooks/useSearch";
import { useGeocode } from "@/hooks/useGeocode";
import { Input } from "./input";
import { useState } from "react";
import { DropBox } from "./drop-box";

const InputBox = styled.div`
  position: relative;
  width: 300px;
  cursor: pointer;
  div{
    display: initial;
    @media (min-width: ${props=> props.theme.largeBreakpoint}){
      display: none;
    }
  }
  
`
const Icon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.8rem;
  svg{
    color: ${props=> props.theme.color.text}
  }
`

export function SearchBar (){
  const {setSearch} = useSearch();
  const {geocodeData} = useGeocode();
  const [openDropBox, setOpenDropBox] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return(
    <InputBox>
      <Icon>{SearchIcon}</Icon>
      <div>
        <Input 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleChange={setSearch} 
          setOpenDropBox={setOpenDropBox} 
          setLoadingSearch={setLoadingSearch}/>
        <DropBox 
          data={geocodeData} 
          openDropBox={openDropBox} 
          loadingSearch={loadingSearch} 
          setOpenDropBox={setOpenDropBox}
          setInputValue={setInputValue}/>
      </div>
      
    </InputBox>
  )
}