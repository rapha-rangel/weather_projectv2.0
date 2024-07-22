import sun from "../assets/sun.png"
import cloudy from "../assets/cloudy.png"
import fog from "../assets/foggy.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import snowShower from "../assets/snowShower.png"
import thunderstorm from "../assets/thunderstorm.png"


export function WeatherCodeResponse(code: number| undefined){
  switch(code){
		case 0:
			return {texto: "Limpo", imagem:sun};
			break;
		case 1:
		case 2:
		case 3:
			return {texto: "Nublado", imagem:cloudy};
			break;
		case 45:
		case 48:
			return {texto: "Nevoa", imagem:fog};
			break;
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return {texto: "Chuvisco", imagem:drizzle};
			break;
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return {texto: "Chuva", imagem:rain};
			break;
		case 71:
		case 73:
		case 75:
		case 77:
			return {texto: "Neve", imagem:snow};
			break;
		case 85:
		case 86:
			return {texto: "Nevasca", imagem:snowShower};
			break;
		case 95:
		case 96:
		case 99:
			return {texto: "Tempestade", imagem:thunderstorm};
			break;
		default:
	}
}