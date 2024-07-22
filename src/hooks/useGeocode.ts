import axios from "axios";
import { useSearch } from "./useSearch";
import { useEffect, useState } from "react";

export function useGeocode(){
  const {search} = useSearch();
  const [newObj, setNewObj] = useState([]);

  useEffect(()=>{
    getCity()
  },[search])

  const url = `https://geocode.maps.co/search?city=${search}&api_key=6686a90f6c417772388247ohj7feb38`;
  
  const getCity = async ()=>{
    try{
      const response= await axios.get(url);
      if(response.status ===200 && search.length>1 && response.data){
        setNewObj(response.data)
      }
    } catch(err){
      console.log(err)
    }
  }

  const res =newObj.map((obj: any)=>{
    return {city: obj.display_name.split(",")[0],state: obj.display_name.split(",")[obj.display_name.split(",").length-3],
            country: obj.display_name.split(",")[obj.display_name.split(",").length-1],latitude: obj.lat, longitude: obj.lon}
  });

  return {
    geocodeData: res
  }
}