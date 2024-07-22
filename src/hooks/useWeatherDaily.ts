'use client'
import { fetchWeatherApi } from "openmeteo";
import { useSelectCity } from "./useSelectCity";
import { useEffect, useState } from "react";
import {rangeTemperatureForDay} from '@/utils/temperature-range-for-day'
import {WeatherDailyTypes} from "@/types/wheather-types";
import { FormatParams } from "@/utils/format-params";
import { useSearch } from "./useSearch";

export function useWeatherDaily() {
  const {infoCity} = useSelectCity();
  const {graus} = useSearch();
  const [loading, setLoading] =useState(false);

  useEffect(()=> {
    getWeather()
  }, [infoCity, graus]);

  const [dailyWeather, setDailyWeather] = useState<WeatherDailyTypes[]>([]);
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    "latitude": Number(infoCity.lat),
    "longitude": Number(infoCity.long),
    "hourly": "temperature_2m",
	  "daily": ["weather_code","temperature_2m_max", "temperature_2m_min"],
    "timezone": "America/Sao_Paulo",
    "forecast_days": 5
  };

  const getWeather= async()=>{
    if(!infoCity&& !infoCity) return;
    setLoading(true);
    const responses = await fetchWeatherApi(url, FormatParams(params, graus));
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    const response = responses[0];
    const tempHourly: number[]=[];
    const tempDay: WeatherDailyTypes[]=[];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    
    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
      },

      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
      },
    };

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      tempHourly.push(Math.round(weatherData.hourly.temperature2m[i]))
    }
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      tempDay.push({
        day:weatherData.daily.time[i].toISOString(),
        weatherCode: weatherData.daily.weatherCode[i],
        maxTemperature: weatherData.daily.temperature2mMax[i],
        minTemperature:weatherData.daily.temperature2mMin[i],
        rangeTemperature: rangeTemperatureForDay(tempHourly, i)
      })
    }
    setDailyWeather(tempDay)
    setTimeout(()=>{
      setLoading(false)
    },3000)
  }
  return {
		dailyWeatherData: dailyWeather,
    loading
	}

}