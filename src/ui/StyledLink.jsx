import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled(Link)`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	text-decoration: none;
	font-weight: 600;
	color: var(--color-grey-700);
	padding: 0.6rem 1rem;
	transition: all 0.3s;
	&:hover {
		background-color: var(--color-grey-300);
	}
	& svg {
		width: 1.8rem;
		height: 1.8rem;
	}

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-grey-300);
		`}
`;

export default StyledLink;
