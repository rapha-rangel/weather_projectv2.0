import styled from "styled-components"
import { HourWeatherBox } from "./hour-wheather-box"
import { useWeatherHourly } from "@/hooks/useWeatherHourly";
import { Loading } from "./loading";

const Box = styled.div`
  width: 100%;
  gap:30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: space-between;
  justify-items: center;
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 70%;
  }
`
const LoadingBox = styled.div`
    width: 100%;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 70%;
  }
`

export function DayLongBox (){
  const {hourlyWeatherData, loading} = useWeatherHourly();
  return(
    <>
      {loading?
        <LoadingBox><Loading/></LoadingBox>
      :
        <Box>
          {hourlyWeatherData &&
            hourlyWeatherData.map((weather, index)=> (
            <HourWeatherBox
              key={index}
              index={index}
              weather={weather}/>
            ))
          }
        </Box>
      }
    </>
  )
}