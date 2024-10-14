import { WeatherLocalStorageTypes } from "@/types/wheather-types";

export function moveArrayElement(arr: WeatherLocalStorageTypes[], position: number) {
    var toLastPosition = arr[position];
    arr.splice(position, 1);
    arr.push(toLastPosition)
    return arr
};