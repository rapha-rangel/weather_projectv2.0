export function rangeTemperatureForDay (temp: number[], day:number){
  const calcDaySlice =day*24;
  const tempDay= temp.slice(calcDaySlice,calcDaySlice+23);

  const obj=tempDay.reduce((acc:any, val:number)=>{
    return acc[val] ? ++ acc[val] : acc[val]=1,acc
  },{})

  const ocorrencias = Object.entries(obj).reduce((acc:any, cur:any)=>{
    return  cur[1] > acc[1] ? cur:
            cur[1] === acc[1] ? [cur, acc]: acc
  })
  const indexOfMaxOcurrence:any=[];
  Object.keys(obj).forEach((key)=> ocorrencias.map(oc => {
    if(Array.isArray(oc)) {
      if(JSON.stringify(key) === JSON.stringify(oc[0])) indexOfMaxOcurrence.push(key)
    } else{
      if(JSON.stringify(key) === JSON.stringify(oc)) indexOfMaxOcurrence.push(key)
    }
  }))
  const arrayObj =Object.keys(obj).map(x=> Number(x))
  arrayObj.sort((a,b)=>a-b);
  const rangeNum= arrayObj[arrayObj.length-1] -  arrayObj[0];
  return {indexMin:arrayObj.indexOf(Number(indexOfMaxOcurrence[0])), 
    indexMax:arrayObj.indexOf(Number(indexOfMaxOcurrence[1])), 
    range: rangeNum
  }
}