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
import { SearchBoxMobile } from "@/components/search-box-mobile";

function Home() {
  const {items} = useLocalStorage();
  const {setInfoCity}= useSelectCity();
  const {darkMode} = useSearch();

  useEffect(()=>{
    if(items.length> 0){
      setInfoCity({
        lat: items[items.length-1].latitude,
        long: items[items.length-1].longitude,
        city:items[items.length-1].city,
        country:items[items.length-1].country });
      }else{
        setInfoCity({
          lat: 0,
          long: 0,
          city:"",
          country:"" 
        })
      }
  }, [items])

  const Theme ={
    color:{
      background:{
        sun: "#F2EE6A",
        moon: "#8C48DE"
      },
      loading:"#5c8fe7"
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
      loading: Theme.color.loading,
      text: "#000000",
      subTitle:"#ffff",
      boxshadow:Theme.color.background.sun
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
      loading: Theme.color.loading,
      text: "#ffff",
      subTitle:"#b5b4b8",
      boxshadow:Theme.color.background.moon
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
        {items.length>0?
          <Main/>
          :
          <div>
            Não possui dados
          </div>
        }
      </DefaultLayout>
      <SearchBoxMobile/>
    </ThemeProvider>
  );
}

export default dynamic (()=> Promise.resolve(Home), {ssr: false})
