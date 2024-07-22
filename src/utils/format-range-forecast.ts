export function FormatRangeForecast(range:{range: number, indexMax:number,indexMin: number }){
  const rangeForUnity= 100/(range.range);
  if(range.indexMax === undefined){
    return {width:rangeForUnity, left:range.indexMin*rangeForUnity}
  } else{
    return {width:(range.indexMax-range.indexMin+1)*rangeForUnity, left:range.indexMin*rangeForUnity}
  }

}