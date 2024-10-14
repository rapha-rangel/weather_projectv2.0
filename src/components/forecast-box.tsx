import styled from "styled-components";
import { Forecast } from "./forecast";
import { useWeatherDaily } from "@/hooks/useWeatherDaily";
import { Loading } from "./loading";
import { useEffect } from "react";


const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    display: flex;
    width: 70%;
    gap: 30px;
    flex-direction: column;
  }
`
const Title = styled.h3`
  font-size: 20px;
  font-weight: 400;
`

export function ForecastBox() {
  const {dailyWeatherData, loading}=useWeatherDaily();

  return (
    <Box>
      <Title>5-day forecast</Title>
      {loading?
        <Loading/>
      :
        <>
          {dailyWeatherData && 
            dailyWeatherData.map((daily, index)=> (
            <Forecast
              key={index}
              index={index}
              day={daily}/>
          ))}
        </>
      }
    </Box>
  )
}