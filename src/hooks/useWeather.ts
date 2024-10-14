'use client'
import { fetchWeatherApi } from "openmeteo";
import { useSelectCity } from "./useSelectCity";
import { useEffect, useState } from "react";
import { WeatherPainelTypes } from "@/types/wheather-types";
import { useSearch } from "./useSearch";
import { FormatParams } from "@/utils/format-params";

export function useWeather() {
  const {infoCity} = useSelectCity();
  const {graus} = useSearch();
  const [loading, setLoading] =useState(false);

  useEffect(()=> {
    getWeather();
    setInterval(()=>{
      getWeather()
    },600000)
  }, [infoCity, graus]);

  const [currentWeather, setCurrentWeather] = useState<WeatherPainelTypes>();
  const url = "https://api.open-meteo.com/v1/forecast";
  
  const params = {
    "latitude": Number(infoCity.lat),
    "longitude": Number(infoCity.long),
    "current": ["temperature_2m", "apparent_temperature", "is_day", "wind_speed_10m", "weather_code"],
    "daily": ["temperature_2m_max", "temperature_2m_min"],
    "timezone": "America/Sao_Paulo",
    "forecast_days": 1,
  };

  const getWeather= async()=>{
    if(!infoCity.lat&& !infoCity.long) return;
    setLoading(true);
    const responses = await fetchWeatherApi(url, FormatParams(params, graus));
    const range = (start: number, stop: number, step: number) => 
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;
    
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        apparentTemperature: current.variables(1)!.value(),
        isDay: current.variables(2)!.value(),
        windSpeed10m: current.variables(3)!.value(),
        weatherCode: current.variables(4)!.value(),
      },

      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
      },
    };

    for (let i = 0; i < weatherData.daily.time.length; i++) {
    }
    setCurrentWeather({
      temperature:weatherData.current.temperature2m, 
      apparentTemperature:weatherData.current.apparentTemperature, 
      isDay: weatherData.current.isDay, 
      windSpeed:weatherData.current.windSpeed10m, 
      maxTemperature: weatherData.daily.temperature2mMax,
      minTemperature: weatherData.daily.temperature2mMin,
      weatherCode: weatherData.current.weatherCode,
    })
    setTimeout(()=>{
      setLoading(false)
    },3000)
  }
  return {
		weatherData: currentWeather,
    loading
	}

}