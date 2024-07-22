export interface WeatherPainelTypes { 
    temperature?:number 
    apparentTemperature?:number
    isDay?: number
    windSpeed?: number
    maxTemperature?: Float32Array
    minTemperature?: Float32Array
    weatherCode?:  number
}

export interface WeatherHourlyTypes {
    temperature:number
    weatherCode:number
    time: string
}

export interface WeatherDailyTypes {
    day:string
    weatherCode:number
    maxTemperature: Float32Array|number
    minTemperature:Float32Array|number
    rangeTemperature:{
        indexMin: number
        indexMax: number
        range: number
    }
}

export interface WeatherOtherCitiesTypes {
    weatherCode:number,
    temperature:number, 
    longitude: number, 
    latitude: number,
    city:string, 
    country: string
}