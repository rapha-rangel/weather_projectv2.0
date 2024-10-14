import { SearchIcon } from "@/icons/icons";
import styled from "styled-components";
import {ChangeEvent} from 'react';

interface InputProps{
	inputValue: string
	openBox: boolean
	setInputValue: (value: string)=> void
	handleChange: (value: string)=> void
	setOpenDropBox: (value: boolean)=> void
	setLoadingSearch:(value: boolean)=> void
}

interface InputTagsTypes{
	$open: boolean
}
interface IconTypes{
	$show: boolean
	$type: string
}
const Box = styled.div`
	position: relative;
	width:100%;
	:first-child{
		left: 10px;
	}
	:last-child{
		right: 20px;
	}
`
const InputTag = styled.input<InputTagsTypes>`
  padding: 15px 40px 15px 50px;
  border-radius:${props=> props.$open?"25px 25px 0px 0px": "25px"};
	border: none;
  border-bottom: ${props=> props.$open?"1px solid": "none"};
	border-color: ${props=> props.theme.color.text};
  font-size: 18px;
  outline: none;
  color: ${props=> props.theme.color.text};
	width: 100%;
  background-color: ${props=> props.theme.color.background.cards};
	transition: all 1s;
  &::placeholder{
    color: ${props=> props.theme.color.text};
	}
`
const Icon = styled.div<IconTypes>`
	position: absolute;
	font-size: ${props=> props.$type==="glass"?"1.8rem":"16px"};
	cursor: ${props=> props.$type==="glass"?"none":"pointer"};
	top:50%;
	transform: translateY(-50%);
	display: ${props=> props.$show? "flex":"none"};
	color: ${props=> props.theme.color.text};
`

export function Input({handleChange, setOpenDropBox,setLoadingSearch,inputValue,openBox, setInputValue}: InputProps){
	const handleSearch =(e:ChangeEvent<HTMLInputElement>)=>{
		e.preventDefault();
		setInputValue(e.target.value);
		if(e.target.value.length < 2){
			setOpenDropBox(false)
			setLoadingSearch(false)
			handleChange("");
		} else{
			setLoadingSearch(true)
			setTimeout(()=> {
				handleChange(e.target.value);
			}, 2000);
			setTimeout(()=> {
				setLoadingSearch(false);
			}, 2800)
			setOpenDropBox(true);
		}
	}

	const handleReset=()=>{
		setOpenDropBox(false);
		setLoadingSearch(false);
		handleChange("");
		setInputValue("");
	};
	
  return(
		<Box>
      <Icon
			$type={"glass"}
			$show={true}>{SearchIcon}</Icon>
			<InputTag type="text" placeholder="Search city..."
				onChange={handleSearch}
				value={inputValue}
				$open={openBox}
			/>
			<Icon
			$type={'clear'}
			$show={inputValue.length> 0? true: false}
				onClick={handleReset}>X</Icon>
		</Box>
		
	)
}