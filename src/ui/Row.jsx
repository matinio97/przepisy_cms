import styled from "styled-components";

const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.4rem;
	align-items: center;
	/* background-color: red; */
	/* @media (min-width: 500px) { */
	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

export default Row;
