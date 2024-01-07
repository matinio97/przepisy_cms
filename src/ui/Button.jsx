import styled, { css } from "styled-components";

const variations = {
	primary: css`
		color: var(--color-grey-700);
		background-color: var(--color-grey-200);
		&:hover {
			background-color: var(--color-grey-300);
		}
	`,
	secondary: css`
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);
		&:hover {
			background-color: var(--color-brand-700);
		}
	`,
	success: css`
		color: var(--color-grey-100);
		background-color: var(--color-green-300);
		&:hover {
			background-color: var(--color-green-700);
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-700);
		&:hover {
			background-color: var(--color-red-800);
		}
	`,
};

const Button = styled.button`
	font-size: 1.2rem;
	padding: 0.6rem 1.2rem;
	border: none;
	outline: none;
	height: min-content;
	border-radius: var(--border-radius-sm);
	/* box-shadow: var(--shadow); */

	${(props) => variations[props.$variation]}
	transition: all 0.3s;
`;

Button.defaultProps = {
	$variation: "primary",
};

export default Button;
