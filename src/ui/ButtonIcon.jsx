import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
	background: none;
	border: none;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--border-radius-sm);
	transition: all 0.2s;
	&:hover {
		background-color: var(--color-grey-100);
		cursor: pointer;
	}

	& svg {
		width: 1.8rem;
		height: 1.8rem;
		color: ${(props) =>
			props.color ? css`var(${props.color})` : css`var(--color-brand-600)`};
	}
`;

export default ButtonIcon;
