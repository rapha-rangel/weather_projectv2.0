export function rangeTemperatureForDay (temp: any, day:number){
  const calcDaySlice =day*24;
  const tempDay= temp.slice(calcDaySlice,calcDaySlice+23);

  const obj=tempDay.reduce((acc:any, val:any)=>{
    return acc[val] ? ++ acc[val] : acc[val]=1,acc
  },{})

  const ocorrencias = Object.entries(obj).reduce((acc:any, cur:any)=>{
    return  cur[1] > acc[1] ? cur:
            cur[1] === acc[1] ? [cur, acc]: acc
  })
  const indexOfMaxOcurrence:any=[];
  Object.keys(obj).forEach((key, index)=> ocorrencias.map(oc => {
    if(Array.isArray(oc)) {
      if(JSON.stringify(key) === JSON.stringify(oc[0])) indexOfMaxOcurrence.push(index)
    } else{
      if(JSON.stringify(key) === JSON.stringify(oc)) indexOfMaxOcurrence.push(index)
    }
  }))
  
  return {indexMin:indexOfMaxOcurrence[0], indexMax:indexOfMaxOcurrence[1], range: Object.keys(obj).length}
}