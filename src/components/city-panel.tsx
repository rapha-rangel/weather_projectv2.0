import styled,{keyframes, css} from "styled-components";
import snowImage from "../assets/snow.png";
import { WeatherCodeResponse } from "@/utils/weather-code-response";
import { useSelectCity } from "@/hooks/useSelectCity";
import { useState } from "react";
import { WeatherOtherCitiesTypes } from "@/types/wheather-types";

interface CityPanelProps {
  data: WeatherOtherCitiesTypes
  index:number
}
interface BoxTypes {
  $select:boolean
  $position: number
}

const showCards =($position:number)=> keyframes`
  0% { opacity:0; display:none;transform:translateX(${$position*-200}px); }
  100%{  opacity:1; display:flex; transform:translateX(0); }
`
const selectCard = keyframes`
  0% {opacity:1;}
	100% {opacity:0;}
`

const Box = styled.div<BoxTypes>`
  background-color:${props=> props.theme.color.background.cards};
  border-radius: 20px;
  border: none;
  padding: 30px 30px;
  display: flex;
  justify-content: space-between;
  gap:10px;
  cursor: pointer;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s;
  &:hover{
    transform: scale(1.05);
  }
  ${(props)=>{
    if(props.$select){
      return css`
        animation:${selectCard} 2s cubic-bezier(0.215, 0.610, 0.355, 1);
      `
    } else{
      return css`
        animation:${showCards(props.$position)} 3s cubic-bezier(0.165, 0.84, 0.44, 1) ;
      `
    }
  }}
`
const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
`
const TextCity = styled.h3`
  font-size: 28px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
  width: 300px;
`
const TextCountry = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props=> props.theme.color.subTitle};
  text-transform: capitalize;
`
const TextWeather = styled.p`
  font-size: 16px;
  text-transform: capitalize;
`
const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
`
const DegreeText = styled.h4`
  font-weight: 600;
  font-size: 40px;
`

export function CityPanel({data, index}: CityPanelProps) {
  const weatherCode =WeatherCodeResponse(data.weatherCode);
  const [selectAnimation, setSelectAnimation] = useState(false);
  const {setInfoCity, infoCity} = useSelectCity();

  const handleSelectCity=(country: string, city: string, lat: number, long: number)=>{
    if(infoCity.long ===long && infoCity.lat===lat) return;
    setSelectAnimation(true);
    setTimeout(()=>{
      setSelectAnimation(false)
      const params ={
        country, city, lat, long
      }
      setInfoCity(params)
    },1000)

  }
  return(
    <Box 
      $position={index}
      $select={selectAnimation}
      onClick={()=>handleSelectCity(data.country, data.city, data.latitude, data.longitude)}>
      <BoxInfo>
        <TextCountry>{data.country}</TextCountry>
        <TextCity>{data.city}</TextCity>
        <TextWeather>{weatherCode?.texto}</TextWeather>
      </BoxInfo>
      <BoxInfo>
        <Image src={weatherCode?.imagem.src} alt=""/>
        <DegreeText>{data.temperature.toFixed(0)}°</DegreeText>
      </BoxInfo>
    </Box>
  )
}