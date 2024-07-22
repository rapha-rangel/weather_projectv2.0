export function formatWeekDay(day: string){
  const weekDays=["Dom", "Seg", "Ter", "Qua", "Qui","Sex","Sab","Dom", "Seg", "Ter", "Qua", "Qui","Sex","Sab"];
  const numberOfDay = new Date(day).getDay() +1;
  if(numberOfDay ===new Date().getDay()){
    return "Hoje"
  }
  return weekDays[numberOfDay]
}