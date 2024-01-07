import styled from "styled-components";

const StyledMain = styled.main`
	flex: 1;
	overflow: auto;
	padding: 1rem;
	overflow-x: hidden;
	scroll-behavior: smooth;
`;

const Main = ({ children }) => {
	return <StyledMain>{children}</StyledMain>;
};

export default Main;
