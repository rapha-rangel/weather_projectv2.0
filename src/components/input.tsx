import styled from "styled-components";

interface InputProps{
	inputValue: string
	setInputValue: (value: string)=> void
	handleChange: (value: string)=> void
	setOpenDropBox: (value: boolean)=> void
	setLoadingSearch:(value: boolean)=> void
}

const InputTag = styled.input`
  padding: 15px 20px 15px 30px;
  width: 0px;
  border-radius: 25px;
  border: none;
  font-size: 18px;
  outline: none;
  color: inherit;
  background-color: ${props=> props.theme.color.background.cards};
	transition: all 1s;
  &::placeholder{
    color: ${props=> props.theme.color.text};
	}
	@media (min-width: ${props=> props.theme.headerBreakPoint}){
    width: 300px;
		padding: 15px 20px 15px 50px;
  }
`

export function Input({handleChange, setOpenDropBox,setLoadingSearch,inputValue, setInputValue}: InputProps){
	const handleSearch =(e:any)=>{
		setInputValue(e.target.value);
		if(e.target.value.length < 2){
			setOpenDropBox(false)
			setLoadingSearch(false)
			handleChange("");
		} else{
			setLoadingSearch(true)
			setTimeout(()=> {
				handleChange(e.target.value)
			}, 1800);
			setTimeout(()=> {
				setLoadingSearch(false);
			}, 2000)
			setOpenDropBox(true);
		}
	}
  return(
		<InputTag type="text" placeholder="Search city..."
			onChange={handleSearch}
			value={inputValue}
		/>
	)
}