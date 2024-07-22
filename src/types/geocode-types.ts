export interface GeocodeDataTypes {
	data: GeocodeTypes[]
}

export interface GeocodeTypes {
	city: string
	state: string
	country: string
	latitude: number
	longitude: number
}


export interface SelectCityTypes{
		lat:number
    long: number
    city:string
    country:string
}
