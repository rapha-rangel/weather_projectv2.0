'use client'
import { DefaultLayout } from "@/components/default-page-layout";
import { Main } from "@/components/main";
import { useSelectCity } from "@/hooks/useSelectCity";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { ThemeProvider } from "styled-components";
import { useSearch } from "@/hooks/useSearch";
import { DefaultTheme } from "styled-components";



 function Home() {
  const {items} = useLocalStorage();
  const {setInfoCity}= useSelectCity();
  const {darkMode} = useSearch();

  useEffect(()=>{
    if(items){
      setInfoCity({
        lat: items[0].latitude,
        long: items[0].longitude,
        city:items[0].city,
        country:items[0].country });
      }
  }, [])

  const Theme ={
    color:{
      background:{
        sun: "#F2EE6A",
        moon: "#8C48DE"
      },
    },
    layoutBreakpoint: "2000px",
    largeBreakpoint: "1440px",
    laptopBreakpoint: "888px",
    tabletBreakpoint: "780px",
    headerBreakPoint:"650px"
  };

  const LightTheme :DefaultTheme ={
    color:{
      background:{
        cards: "#b5b4b8" ,
        sun: Theme.color.background.sun,
        moon: Theme.color.background.moon,
        body: "#e6e2e2d1",
      },
      text: "#00000",
      subTitle:"#ffff",
    },
    layoutBreakpoint: Theme.layoutBreakpoint,
    largeBreakpoint:Theme.largeBreakpoint,
    laptopBreakpoint:Theme.laptopBreakpoint,
    tabletBreakpoint:Theme.tabletBreakpoint,
    headerBreakPoint:Theme.headerBreakPoint
  };

  const DarkTheme :DefaultTheme= {
    color:{
      background:{
        cards: "#424240",
        sun: Theme.color.background.sun,
        moon: Theme.color.background.moon,
        body: "#000000",
      },
      text: "#ffff",
      subTitle:"#b5b4b8" 
    },
    layoutBreakpoint: Theme.layoutBreakpoint,
    largeBreakpoint:Theme.largeBreakpoint,
    laptopBreakpoint:Theme.laptopBreakpoint,
    tabletBreakpoint:Theme.tabletBreakpoint,
    headerBreakPoint:Theme.headerBreakPoint
  }

  return (
    <ThemeProvider theme={darkMode?DarkTheme:LightTheme}>
      <DefaultLayout>
        <Header/>
        <Main/>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default dynamic (()=> Promise.resolve(Home), {ssr: false})
