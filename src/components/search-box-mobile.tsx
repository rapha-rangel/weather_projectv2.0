import { useGeocode } from "@/hooks/useGeocode";
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Input } from "./input";
import { DropBox } from "./drop-box";
import { useOpenModal } from "@/hooks/useOpenModal";
import { BackIcon } from "@/icons/icons";

interface BoxTypes {
  $open: boolean
};

const $showAnimation = keyframes`
  0%{ display: flex; opacity: 0; top:-200px}
	30%{ opacity: 1;top:0}
  100% { opacity: 1; }
`

const Box = styled.div<BoxTypes>`
  background-color:${props=> props.theme.color.background.body};
  display: ${props=> props.$open ? "flex":"none"};
  flex-direction: column;
  position: absolute;
  padding: 30px;
  top: 0px;
  left:0px;
  width: 100%;
  z-index: 100;
  animation:${$showAnimation} 2s ease-in-out ;
`
const BackButton= styled.div`
  margin:10px 0px 20px;
  font-size: 2rem;
  width:40px;
  height: 40px;
  cursor: pointer;
  color: ${props=> props.theme.color.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s ease-in-out;
  &:hover{
    background-color: ${props=>props.theme.color.boxshadow} ;
    border-radius: 100%;
  }
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export function SearchBoxMobile(){
  const {setSearch} = useSearch();
  const {openModal, setOpenModal}= useOpenModal();
  const {geocodeData} = useGeocode();
  const [openDropBox, setOpenDropBox] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleBackButton=()=>{
    setOpenModal(false);
    setInputValue("");
    setSearch("");
    setLoadingSearch(false)
    setOpenDropBox(false);
  }

  return(
    <Box
      $open={openModal}>
      <BackButton
        onClick={handleBackButton}>{BackIcon}</BackButton>
      <InputBox>
        <Input
          openBox={loadingSearch||openDropBox}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleChange={setSearch} 
          setOpenDropBox={setOpenDropBox} 
          setLoadingSearch={setLoadingSearch}/>
        <DropBox 
          position={false}
          data={inputValue.length> 1?geocodeData:[]} 
          openDropBox={openDropBox} 
          loadingSearch={loadingSearch} 
          setOpenDropBox={setOpenDropBox}
          setInputValue={setInputValue}/>
      </InputBox>
    </Box>
  ) 
}

