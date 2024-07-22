'use client'
import styled, {keyframes} from "styled-components";
import windImage from "../assets/wind.png"
import { WeatherCodeResponse } from "@/utils/weather-code-response";
import { Clock } from "./clock";
import { WeatherPainelTypes } from "@/types/wheather-types";
import { Loading } from "./loading";

interface MainPanelProps {
  weatherData: WeatherPainelTypes |undefined
  selectedCity: string
  loading: boolean
}

const showCards = keyframes`
  0% { opacity:0; display:none;transform:translatex(-500px); }
  100%{  opacity:1; display:flex; transform:translatex(0); }
`

const Box = styled.div`
  min-width: 450px;
  width: 100%;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 30%;
  }
`

const PainelBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color:${props=> props.theme.color.background.cards} ;
  border-radius: 20px;

  border: none;
  padding: 30px 30px;
  animation:${showCards} 2s cubic-bezier(0.165, 0.84, 0.44, 1) ;
  gap:10px;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 100%;
  }
`
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
    span {
      font-weight: 400;
      color: ${props=> props.theme.color.subTitle};
    }
  }
`
const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 5px;
    padding-bottom: 20px;
    width:100%;
    @media (min-width: ${props=> props.theme.largeBreakpoint}){
      width: 50%;
    }
  }
`
const Image = styled.img`
  width: 50px;
  height: 50px;
`
const NumberDegree = styled.h2`
  font-size: 60px;
  font-weight: 700;
`
const TextCity = styled.h3`
  width:100%;
  font-size: 32px;
  text-align: right;
  text-transform: capitalize;
  @media (min-width: ${props=> props.theme.largeBreakpoint}){
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
const TextWind = styled.h4`
  font-size: 20px;
`
const TextMiddle = styled.p`
  font-size: 16px;
`
export function MainPanel ({weatherData, selectedCity, loading}: MainPanelProps ){
  const weatherResponse =WeatherCodeResponse(weatherData?.weatherCode);
  return (
    <Box>
      {loading ?
        <Loading/>
      :
        <PainelBox>
          <FirstLine>
            <NumberDegree>{Number(weatherData?.temperature).toFixed(1)}°</NumberDegree>
            <div>
              <TextCity>{selectedCity}</TextCity>
              <Clock/>
            </div>
          </FirstLine>
          <Line>
            <div>
              <Image src={weatherResponse?.imagem.src} alt={weatherResponse?.texto}/>
              <span>{weatherResponse?.texto}</span>
            </div>
            <div>
              <Image src={windImage.src} alt="imagem vento"/>
              <TextWind>{Number(weatherData?.windSpeed).toFixed(2)} km/h</TextWind>
            </div>
              
          </Line>
          <Line>
            <TextMiddle>Feel Like: <span>{Number(weatherData?.apparentTemperature).toFixed(1)}</span> °C</TextMiddle>
            <TextMiddle><span>{Number(weatherData?.minTemperature).toFixed(1)}</span>° to <span>{Number(weatherData?.maxTemperature).toFixed(1)}</span>°</TextMiddle>
          </Line>
        </PainelBox>
    }
      
    </Box>
  )
}