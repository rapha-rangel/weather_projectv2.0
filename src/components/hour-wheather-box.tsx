import styled, {keyframes} from "styled-components";
import { formatHour } from "@/utils/format-hour";
import { WeatherCodeResponse } from "@/utils/weather-code-response";
import { WeatherHourlyTypes } from "@/types/wheather-types";

interface HourWeatherBox {
  weather: WeatherHourlyTypes
  index: number
}

interface BoxTypes {
  $position: number
}

const showCards =($position:number)=> keyframes`
  0% { opacity:0; display:none;transform:translatey(${$position*-200}px); }
  100%{  opacity:1; display:flex; transform:translatex(0); }
`

const Box = styled.div<BoxTypes>`
  background-color:${props=> props.theme.color.background.cards} ;
  border-radius: 20px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  height: 100%;
  gap:30px;
  animation:${props=> showCards(props.$position)} 3s cubic-bezier(0.165, 0.84, 0.44, 1) ;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
  }
`
const TextHour = styled.p`
  font-size: 16px;
`
const Divider = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 15px;
  background-color: black;
`
const Image = styled.img`
  width: 50px;
  height: 50px;
`
const TextWeather = styled.p`
  font-weight: 400;
  color:${props=> props.theme.color.subTitle};
`
const DegreeText = styled.h4`
  font-weight: 600;
  font-size: 28px;
`

export function HourWeatherBox({weather, index}: HourWeatherBox) {
  const weatherResponse =WeatherCodeResponse(weather.weatherCode);
  return(
    <Box
      $position={index}>
      <div>
        <TextHour>{formatHour(weather.time)}</TextHour>
        <Divider/>
      </div>
      <div>
        <Image src={weatherResponse?.imagem.src} alt={weatherResponse?.texto}/>
        <TextWeather>{weatherResponse?.texto}</TextWeather>
      </div>
      <DegreeText>{Math.round(weather.temperature)}°</DegreeText>
    </Box>
  )
}