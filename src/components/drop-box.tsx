import styled, {keyframes, css} from "styled-components";
import { GeocodeTypes } from "@/types/geocode-types";
import { LoadingIcon } from "@/icons/icons";
import { useSelectCity } from "@/hooks/useSelectCity";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOpenModal } from "@/hooks/useOpenModal";

interface DropBoxProps {
	data: GeocodeTypes[]
	openDropBox: boolean
	loadingSearch: boolean
	position: boolean
	setInputValue:  (value: string)=> void
	setOpenDropBox: (value: boolean)=> void
}

interface ListDropBoxTypes {
	$open: boolean
	$position:boolean
}

interface LoadingTypes {
	$position:boolean
}

const $showAnimation = keyframes`
  0%{ display: flex; opacity: 0;}
	30%{ opacity: 0.4;}
  100% { opacity: 1; }
`
const $showOffAnimation = keyframes`
  0% { opacity:1; }
  100%{ opacity:0; display:none}
`
	const loadingAnimation = keyframes`
  0% { transform: rotate(0); }
  100%{  transform: rotate(-360deg); }
`
const ListDropBox=styled.ul<ListDropBoxTypes>`
	position: ${props=> props.$position?"absolute":"relative"};
	width: 100%;
	flex-direction: column;
	z-index: 10;
	top: ${props=> props.$position?"52px":"0px"};
	${props =>{
    if(props.$open){
      return css`
        animation:${$showAnimation} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ;
      `
    }else{
      return css`
        animation:${$showOffAnimation} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ;
      `
    }}};
	transition: all 0.4s ease-in-out;
	:first-of-type{
		border-radius: 0px;
	}
	:last-of-type{
		border-radius: 0px 0px 25px 25px;
	}
`
const ElementDropBox = styled.li`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	padding: 10px 20px 10px 20px;
	list-style: none;
	font-size: 12px;
	background-color: ${props=> props.theme.color.background.cards};
	border-color: ${props=> props.theme.color.text};
	border-bottom: 1px solid;
	transition: all 1s;
	span{
		font-weight: 400;
  	color: ${props=> props.theme.color.subTitle};
	}
	div {
		display: flex;
		p{
			font-size: 16px;
		}
	}
	&:hover{
		background-color: white;
		color: black;
		span{
			color:black;
		}
	}
`
const LoadingIconBox =styled.div<LoadingTypes>`
	position: ${props=> props.$position?"absolute":"relative"};
	padding: 10px 20px;
	width: 100%;
	top: ${props=> props.$position?"52px":"0px"};
	background-color: ${props=> props.theme.color.background.cards};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0px 0px 25px 25px;
	svg{
		font-size: 38px;
		color:${props=> props.theme.color.loading};
		animation: ${loadingAnimation} infinite 1s linear;
	}
`

export function DropBox({data,openDropBox, loadingSearch, setOpenDropBox, setInputValue, position}:DropBoxProps) {
	const {setInfoCity} = useSelectCity();
	const {updateLocalStorage}= useLocalStorage();
	const {setOpenModal}=useOpenModal();

	const handleLatLong =(latitude: number,longitude:number, city: string , country: string)=>{
		let cityItem = localStorage.getItem("cities-items");

		if(cityItem){
			let cityItemArr = JSON.parse(cityItem);
			let existingCity = cityItemArr.filter((item:{latitude:number, longitude: number})=> item.latitude ===latitude && item.longitude ===longitude)
				if(existingCity.length ===0 ){
					if(cityItemArr.length>=4){
						cityItemArr.shift();
					} 
				cityItemArr.push({
					latitude, longitude, city, country
				})
				updateLocalStorage(cityItemArr);
			} 
		}else{
			const newItem = [{
				latitude, longitude, city, country
			}];
			updateLocalStorage(newItem);
		}
		const params={
			lat:latitude, 
			long:longitude, 
			city,country
		}
		setOpenDropBox(false);
		setInputValue("");
		setOpenModal(false);
		setInfoCity(params);
	}
  return(
		<>
			{loadingSearch ? 
				<LoadingIconBox
					$position={position}>{LoadingIcon}</LoadingIconBox>
			:
				<ListDropBox 
					$open={openDropBox}
					$position={position}>
					{data && 
						data?.map(({city, state, country, latitude, longitude}, index:number)=>(
							<ElementDropBox key={index} onClick={()=>handleLatLong(latitude, longitude, city, country)}>
								<span>{country}</span>
								<div>
									<p>{city},{state}</p>
								</div>
							</ElementDropBox>
					))}
				</ListDropBox>
			}
		</>
	)
}