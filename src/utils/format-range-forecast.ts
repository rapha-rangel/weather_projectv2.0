export function FormatRangeForecast(range:{range: number, indexMax:number,indexMin: number }){
  const rangeForUnity= 100/(range.range);
  if(range.indexMin ===range.range && range.indexMax === -1 ){
    return {width:rangeForUnity, left:(range.indexMin-1)*rangeForUnity}
  } else
  if(range.indexMax === -1){
    return {width:rangeForUnity, left:range.indexMin*rangeForUnity}
  } else{
    return {width:(range.indexMax-range.indexMin)*rangeForUnity, left:range.indexMin*rangeForUnity}
  }
}