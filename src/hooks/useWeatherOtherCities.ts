'use client'
import { fetchWeatherApi } from "openmeteo";
import { useSelectCity } from "./useSelectCity";
import { useEffect, useState } from "react";
import { WeatherOtherCitiesTypes } from "@/types/wheather-types";
import { useLocalStorage } from "./useLocalStorage";
import { FormatParams } from "@/utils/format-params";
import { useSearch } from "./useSearch";


export function useWeatherOtherCities() {
  const {infoCity } = useSelectCity();
  const [loading, setLoading] =useState(false);
  const {graus} = useSearch();
  const {items} = useLocalStorage();

  useEffect(()=> {
    getWeather();
  }, [items,infoCity, graus]);

  const [otherCitiesWeather, setOtherCitiesWeather] = useState<WeatherOtherCitiesTypes[]>([]);
  const lats =items.map(item=> Number(item.latitude));
  const longs=items.map(item=> Number(item.longitude));
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    "latitude": lats,
    "longitude": longs,
    "current": "temperature_2m",
	  "daily": "weather_code",
    "timezone": "America/Sao_Paulo",
    "forecast_days": 1
  };

  const getWeather= async()=>{
    if(!infoCity.lat&& !infoCity.long) return;
    setLoading(true);
    const responses = await fetchWeatherApi(url, FormatParams(params, graus));
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    const weatherDay:any[]=[];
    responses.forEach((res,index)=>{
      var tempDay;
      var weatherCodeDay;
      var place = items[index];
      const utcOffsetSeconds = res.utcOffsetSeconds();
      const latitude = res.latitude();
      const longitude = res.longitude();
      console.log(longitude, latitude)
      const current = res.current()!;
      const daily = res.daily()!;
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
        },
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: daily.variables(0)!.valuesArray()!,
        },
      };
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        weatherCodeDay =weatherData.daily.weatherCode[i],
        console.log(i)
      }
      tempDay =weatherData.current.temperature2m 
      weatherDay.push({weatherCode:weatherCodeDay,
                      temperature:tempDay, longitude: longs[index], latitude: lats[index],
          city: place.city, country: place.country  })
    })
    setOtherCitiesWeather(weatherDay.slice(0,3))
    setTimeout(()=>{
      setLoading(false)
    },3000);
  }
  return {
		otherCitiesWeatherData: otherCitiesWeather,
    loading
	}

}