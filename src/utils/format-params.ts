import {GrausFilterTypes} from '@/types/graus-filter-types'

export const FormatParams =(params: { latitude: number|number[]; longitude: number|number[]; current?:string| string[]; 
  daily?:string| string[]; timezone: string; forecast_days: number; temperature_unit?: string}, graus:GrausFilterTypes)=>{
  if(graus === GrausFilterTypes.FAHRENHEIT) return params={...params,"temperature_unit":"fahrenheit"}
    return params
}