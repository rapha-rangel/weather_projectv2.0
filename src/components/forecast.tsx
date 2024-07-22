import styled ,{keyframes} from "styled-components";
import {WeatherDailyTypes} from "@/types/wheather-types";
import { WeatherCodeResponse } from "@/utils/weather-code-response";
import { formatWeekDay } from "@/utils/format-week-day";
import { FormatRangeForecast } from "@/utils/format-range-forecast";
import { useEffect } from "react";

interface  ForecastProps {
  day: WeatherDailyTypes
  index: number
}
interface RangeLinePosition{
  $width: number
  $left: number
}
interface BoxTypes{
  $position: number
}

const showCards =($position: number)=> keyframes`
  0% { opacity:0; display:none;transform:translatex(${$position*500}px); }
  100%{  opacity:1; display:flex; transform:translatex(0); }
`

const Box = styled.div<BoxTypes>`
  background-color:${props=> props.theme.color.background.cards};
  border-radius: 20px;
  border: none;
  padding: 30px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${props=>showCards(props.$position)} 3s cubic-bezier(0.165, 0.84, 0.44, 1);
`
const LineFirst=styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    min-width: 280px;
  }
`
const LineLast=styled.div`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextDay = styled.h3`
  font-size: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
  width:90px;
  margin-right: 20px;
`
const TextWeather = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props=> props.theme.color.subTitle};
  text-transform: capitalize;
`
const Image = styled.img`
  display: none;
  margin-right: 0px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    display: flex;
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
`
const DegreeText = styled.p`
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
`
const RangeLine = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 8px;
  background-color: ${props=> props.theme.color.background.body};
  border-radius: 10px;
  position: relative;
`
const RangeLinePosition = styled.div<RangeLinePosition>`
  width: ${({$width})=> $width}%;
  height: 8px;
  background-color: #4082e4;
  border-radius: 10px;
  position: absolute;
  top: 0%;
  left:${({$left})=> $left}%;
`

export function Forecast ({day, index}: ForecastProps){
  const weatherResponse =WeatherCodeResponse(day.weatherCode);
  const rangeForecast = FormatRangeForecast(day.rangeTemperature);

  return (
    <Box
      $position={index}>
      <LineFirst>
        <TextDay>{formatWeekDay(day.day)}</TextDay>
        <Image src={weatherResponse?.imagem.src} alt=""/>
        <TextWeather>{weatherResponse?.texto}</TextWeather>
      </LineFirst>
      <LineLast>
        <DegreeText>{Number(day.minTemperature).toFixed(0)}°</DegreeText>
        <RangeLine>
          <RangeLinePosition $width={rangeForecast.width} $left={rangeForecast.left}/>
        </RangeLine>
        <DegreeText>{Number(day.maxTemperature).toFixed(0)}°</DegreeText>
      </LineLast>
  </Box>
  )
}