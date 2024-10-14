import { WeatherLocalStorageTypes } from "@/types/wheather-types";

export function moveArrayElement(arr: WeatherLocalStorageTypes[], from: number) {
    var el = arr[from];
    arr.splice(from, 1);
    arr.push(el)
    return arr
};