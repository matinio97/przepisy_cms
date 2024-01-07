import styled from "styled-components";

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	-webkit-box-shadow: inset var(--shadow);
	-moz-box-shadow: inset var(--shadow);
	box-shadow: inset var(--shadow);
	padding: 0.8rem 1.2rem;
	border: 0;
	border-radius: var(--border-radius-sm);
	outline: none;
	background-color: var(--color-grey-100);
	color: var(--color-grey-700);
	font-size: 1.1rem;
	transition: all 0.1s;

	flex: 1 0 150; //warunkowo
	@media (min-width: 768px) {
		flex: 1 0 0;
	}

	&:focus {
		border: none;
		border-bottom: 1px solid var(--color-green-700);
		background-color: var(--color-grey-100);
	}
`;

export default Input;
