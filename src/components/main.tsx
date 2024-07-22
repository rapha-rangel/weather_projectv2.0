"use client"

import styled from "styled-components";
import { MainPanel } from "./main-panel";
import { DayLongBox } from "./day-long-box";
import { OtherCitiesBox } from "./other-cities-box";
import { ForecastBox } from "./forecast-box";
import { useWeather } from "@/hooks/useWeather";
import { useSelectCity } from "@/hooks/useSelectCity";

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    display: flex;
  }
`
export const LineBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  &:last-child{
    flex-direction: column-reverse;
  }
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    display: flex;
    flex-direction: row;
    &:last-child{
      display: flex;
      flex-direction: row;
    }
  }
`
export const Title = styled.h2`
  font-size: 26px;
  font-weight: 500;
`
export function Main (){
  const {weatherData, loading} = useWeather();
  const {infoCity}=useSelectCity();

  return(
    <Box>
      <LineBox>
        <MainPanel weatherData={weatherData} loading={loading} selectedCity={infoCity.city}/>
        <DayLongBox/>
      </LineBox>
      <LineBox>
        <OtherCitiesBox/>
        <ForecastBox/>
      </LineBox>
    </Box>
  )
}