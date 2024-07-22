'use client'
import { fetchWeatherApi } from "openmeteo";
import { useSelectCity } from "./useSelectCity";
import { useEffect, useState } from "react";
import { WeatherHourlyTypes } from "@/types/wheather-types";
import { FormatParams } from "@/utils/format-params";
import { useSearch } from "./useSearch";


export function useWeatherHourly() {
  const {infoCity} = useSelectCity();
  const {graus} = useSearch();
  const [loading, setLoading] =useState(false);

  useEffect(()=> {
    getWeather();
  }, [infoCity, graus]);

  const [hourlyWeather, setHourlyWeather] = useState<WeatherHourlyTypes[]>([]);
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    "latitude": Number(infoCity.lat),
    "longitude": Number(infoCity.long),
    "hourly": ["temperature_2m", "weather_code"],
    "timezone": "America/Sao_Paulo",
    "forecast_days": 2
  };

  const getWeather= async()=>{
    if(!infoCity.lat&& !infoCity.long) return;
    setLoading(true);
    const responses = await fetchWeatherApi(url, FormatParams(params, graus));
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    const response = responses[0];
    const tempDay=[];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    
    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000).toLocaleTimeString()
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        weatherCode: hourly.variables(1)!.valuesArray()!,
      },
    };

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      if(i ===3|| i===7 || i===11 ||i===15|| i===19||i===23|| i===27){
        tempDay.push({temperature:weatherData.hourly.temperature2m[i],
          weatherCode: weatherData.hourly.weatherCode[i], 
          time: weatherData.hourly.time[i]
      })
      }
    }
    setHourlyWeather(tempDay);
    setTimeout(()=>{
      setLoading(false)
    },3000);
  }
  return {
		hourlyWeatherData: hourlyWeather,
    loading
	}

}