import styled, {keyframes} from "styled-components"
import { LoadingIcon } from "@/icons/icons";

const loadingAnimation = keyframes`
0% { transform: rotate(0); }
100%{  transform: rotate(-360deg); }
`
const Box = styled.div`
  width: 100%;
  height: 252px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingIconBox =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
	svg{
		font-size: 90px;
		color:${props=> props.theme.color.loading};
		animation: ${loadingAnimation} infinite 1s linear;
	}
`
export function Loading() {
  return(
    <Box>
      <LoadingIconBox>{LoadingIcon}</LoadingIconBox>
    </Box>
  )
}