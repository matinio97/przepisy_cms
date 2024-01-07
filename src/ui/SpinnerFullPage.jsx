import Spinner from "./Spinner";
import styled, { keyframes } from "styled-components";

const FullPage = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SpinnerFullPage = () => {
	return (
		<FullPage>
			<Spinner />
		</FullPage>
	);
};

export default SpinnerFullPage;
