export function formatHour(hour: string){
  const format = hour.slice(0,5);

  if( format.charAt(0) ==="0"){
    return `${format.slice(1, format.length)} AM` 
  } else if(Number(format.slice(0,2))<= 12){
    return `${format} AM` 
  } else{
    return`${Number(format.slice(0,2))-12+format.slice(2,format.length)} PM`
  }
} 