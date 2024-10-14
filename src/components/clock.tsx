import { formatHour } from "@/utils/format-hour";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TextMiddle = styled.p`
  font-size: 16px;
`
export function Clock(){
	const [clock, setClock] = useState('00:00:00');
	useEffect(()=>{
    setInterval(()=>{
      setClock(formatHour(new Date().toLocaleTimeString()) )
    }, 1000)
  },[])
  return (
		<TextMiddle>{clock}</TextMiddle>
	)
}