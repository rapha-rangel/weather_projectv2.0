import styled, { keyframes,css } from "styled-components";
import { GrausFilterTypes } from "@/types/graus-filter-types";
import { DarkModeTypes } from "@/types/dark-mode-types";


interface ButtonSelectProps{
  context: GrausFilterTypes|DarkModeTypes
  handleContext:(value: any)=> void
  iconLeft:{
    icon: string|JSX.Element
    color: string
  }
  iconRight:{
    icon: string|JSX.Element
    color: string
  }
}
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
        animation:${$showAnimation(props.color===""?"#ffff":props.color==="sun"?props.theme.color.background.sun: props.theme.color.background.moon)} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s forwards ;
      `
    }else{
      return css`
        animation:${$showOffAnimation(props.position, props.color===""?"#ffff":props.color==="sun"?props.theme.color.background.sun: props.theme.color.background.moon)} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ;
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
const Option = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`
const OptionText = styled.h3<OptionTypes>`
  z-index: 10;
  font-size: 30px;
  font-weight: 700;
  color: ${props => props.$select? "black": "white"};
  transition: 1.2s all;
`

export function ButtonSelect({context, handleContext, iconLeft, iconRight }:ButtonSelectProps) {

  const handleClick=(value: GrausFilterTypes|DarkModeTypes)=>{
    handleContext(value)
  };
  
  return(
    <Box>
      <Option onClick={()=>handleClick(iconLeft.icon==="°C"?GrausFilterTypes.CELSIUS:DarkModeTypes.LIGHT)} >
        <OptionText
          $select={iconLeft.icon==="°C"?context===GrausFilterTypes.CELSIUS: context===DarkModeTypes.LIGHT}>{iconLeft.icon}
        </OptionText >
        <SpanColor 
          $select={iconLeft.icon==="°C"?context===GrausFilterTypes.CELSIUS: context===DarkModeTypes.LIGHT}
          position={60}
          color={iconLeft.color}/>
      </Option>
      <Option onClick={()=>handleClick(iconRight.icon==="°F"?GrausFilterTypes.FAHRENHEIT: DarkModeTypes.DARK)}>
        <OptionText
          $select={iconRight.icon==="°F"?context===GrausFilterTypes.FAHRENHEIT:context===DarkModeTypes.DARK}>{iconRight.icon}
        </OptionText >
        <SpanColor $select={iconRight.icon==="°F"?context===GrausFilterTypes.FAHRENHEIT:context===DarkModeTypes.DARK}
          position={-60}
          color={iconRight.color}/>
      </Option>
    </Box>
  )
}