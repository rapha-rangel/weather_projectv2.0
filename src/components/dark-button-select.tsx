import styled, { keyframes,css } from "styled-components";
import { DarkModeTypes } from "@/types/dark-mode-types";
import { SunIcon, MoonIcon } from "@/icons/icons";
import { useSearch } from "@/hooks/useSearch";

interface OptionTypes{
  $select: boolean
}
interface SpanColorTypes{
  $select: boolean
  position: number
  color: string
}

const $showAnimation=(color:string) => keyframes`
  0%{ height: 10%; top:50%;}
  100% { height: 100%; background-color:${color};}
`
const $showOffAnimation=(position: number, color:string) => keyframes`
  0% {  height: 100%;  opacity:1;background-color:${color} }
  50% { height: 10%; top:50%; transform: translatex(0px) ;background-color:${color}}
  75% { height: 10%;opacity:1; top:50%; transform: translatex(${position}px) }
  100%{ height: 0%; transform: translatex(${position}px); top:50%;opacity:0;}
`

const SpanColor= styled.span<SpanColorTypes>`
  width: 100%;
  background-color: white;
  top:0;
  left: 0;
  position: absolute;
  border-radius: 25px;
  ${props =>{
    if(props.$select){
      return css`
        animation:${$showAnimation(props.color==="sun"?props.theme.color.background.sun: props.theme.color.background.moon)} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s forwards ;
      `
    }else{
      return css`
        animation:${$showOffAnimation(props.position, props.color==="sun"?props.theme.color.background.sun: props.theme.color.background.moon)} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ;
      `
    }}};
`
const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props=> props.theme.color.background.cards};
  gap:10px;
  border-radius: 25px;
`
const Option = styled.div<OptionTypes>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`
const OptionText = styled.h3<OptionTypes>`
  z-index: 10;
  margin-top: 5px;
  font-size: 30px;
  font-weight: 600;
  color: ${props => props.$select? "black": "white"};
  transition: 1.2s all;
`
export function DarkButtonSelect() {
  const {darkMode, setDarkMode}= useSearch();

  const handleClick=(value: DarkModeTypes)=>{
    setDarkMode(value);
  };

  return(
    <Box>
      <Option onClick={()=>handleClick(DarkModeTypes.LIGHT)} 
        $select={darkMode===DarkModeTypes.LIGHT}>
          <OptionText
            $select={darkMode===DarkModeTypes.LIGHT}>{SunIcon}</OptionText >
        <SpanColor $select={darkMode===DarkModeTypes.LIGHT}
          position={60}
          color={"sun"}/>
      </Option>
      <Option onClick={()=>handleClick(DarkModeTypes.DARK)} 
        $select={darkMode===DarkModeTypes.DARK}>
          <OptionText
            $select={darkMode===DarkModeTypes.DARK}>{MoonIcon}</OptionText >
        <SpanColor $select={darkMode===DarkModeTypes.DARK}
          position={-60}
          color={"moon"}/>
      </Option>
    </Box>
  )
}