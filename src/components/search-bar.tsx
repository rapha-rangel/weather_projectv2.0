"use client"
import styled from "styled-components";
import { SearchIcon } from "@/icons/icons";
import { useSearch } from "@/hooks/useSearch";
import { useGeocode } from "@/hooks/useGeocode";
import { Input } from "./input";
import { useState } from "react";
import { DropBox } from "./drop-box";
import { useOpenModal } from "@/hooks/useOpenModal";

const InputBox = styled.div`
  display: none;
  @media (min-width: ${props=> props.theme.headerBreakPoint}){
    display: flex;
    flex-direction: column;
    position: relative;
    width: 300px;
  }
`
const Icon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.8rem;
  z-index: 10;
  svg{
    color: ${props=> props.theme.color.text}
  }
`
const IconBox = styled.div`
  background-color: ${props=>props.theme.color.background.cards};
  padding: 25px;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
  &:hover{
    box-shadow: 0px 0px 2px 6px  ${props=>props.theme.color.boxshadow};
  }
  @media (min-width: ${props=> props.theme.headerBreakPoint}){
    display: none;
  }
`

export function SearchBar (){
  const {setSearch} = useSearch();
  const {setOpenModal}= useOpenModal();
  const {geocodeData} = useGeocode();
  const [openDropBox, setOpenDropBox] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpenModal=()=>{
    setSearch("");
    setInputValue("");
    setOpenDropBox(false);
    setLoadingSearch(false)
    setOpenModal(true);
  }
  
  return(
    <>
    <IconBox>
      <Icon
      onClick={handleOpenModal}>{SearchIcon}</Icon>
    </IconBox>
    <InputBox>
      <Input 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleChange={setSearch} 
        openBox={openDropBox||loadingSearch}
        setOpenDropBox={setOpenDropBox} 
        setLoadingSearch={setLoadingSearch}/>
      <DropBox 
        position={true}
        data={inputValue.length> 1?geocodeData:[]} 
        openDropBox={openDropBox} 
        loadingSearch={loadingSearch} 
        setOpenDropBox={setOpenDropBox}
        setInputValue={setInputValue}/>
    </InputBox>
    </>
  )
}