import styled, { keyframes,css } from "styled-components";
import { GrausFilterTypes } from "@/types/graus-filter-types";
import { useSearch } from "@/hooks/useSearch";

interface OptionTypes{
  $select: boolean
}
interface SpanColorTypes{
  $select: boolean
  position: number
}
const $showAnimation = keyframes`
  0%{ height: 10%; top:50%;}
  100% { height: 100%; background-color: white;}
`
const $showOffAnimation=(position: number) => keyframes`
  0% {  height: 100%;  opacity:1; }
  50% { height: 10%; top:50%; transform: translatex(0px) }
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
        animation:${$showAnimation} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s forwards ;
      `
    }else{
      return css`
        animation:${$showOffAnimation(props.position)} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ;
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
  padding: 8px 10px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`

const OptionText = styled.h3<OptionTypes>`
  z-index: 10;
  font-size: 25px;
  font-weight: 700;
  color: ${props => props.$select? "black": "white"};
  transition: 1.2s all;
`

export function ButtonSelect() {
  const {graus, setGraus} = useSearch();

  const handleClick=(value: GrausFilterTypes)=>{
    setGraus(value)
  }
  return(
    <Box>
      <Option onClick={()=>handleClick(GrausFilterTypes.CELSIUS)} 
        $select={graus===GrausFilterTypes.CELSIUS}>
          <OptionText
            $select={graus===GrausFilterTypes.CELSIUS}>°C</OptionText >
        <SpanColor $select={graus===GrausFilterTypes.CELSIUS}
        position={60}/>
      </Option>
      <Option onClick={()=>handleClick(GrausFilterTypes.FAHRENHEIT)} 
        $select={graus===GrausFilterTypes.FAHRENHEIT}>
          <OptionText
            $select={graus===GrausFilterTypes.FAHRENHEIT}>°F</OptionText >
        <SpanColor $select={graus===GrausFilterTypes.FAHRENHEIT}
          position={-60}/>
      </Option>
    </Box>
  )
}