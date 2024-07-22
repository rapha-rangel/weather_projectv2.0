import styled from "styled-components";
import { CityPanel } from "./city-panel";
import { useWeatherOtherCities } from "@/hooks/useWeatherOtherCities";
import { Loading } from "./loading";


const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 30%;
    min-width: 450px;
  }
`
const CitiesBox = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  min-width: 450px;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
const Title = styled.h3`
  font-size: 20px;
  font-weight: 400;
`
export function OtherCitiesBox(){
  const {otherCitiesWeatherData, loading} = useWeatherOtherCities();
  return (
    <Box>
      <Title>Other large cities</Title>
      {loading?
        <Loading/>
      :
        <CitiesBox>
          {otherCitiesWeatherData && otherCitiesWeatherData.map((data, index)=>(
            <CityPanel
              key={index}
              index={index}
              data={data}  
            />
          ))}
        </CitiesBox>
      }
    </Box>
      
  )
}