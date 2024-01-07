import React from "react";
import styled, { css } from "styled-components";
import Error from "./Error";
import Label from "./Label";

const StyledFormRow = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	gap: 0.8rem;

	${(props) =>
		props.$wrap
			? css`
					flex-direction: column;
					@media (min-width: 768px) {
						flex-direction: row;
					}
			  `
			: css`
					flex-direction: row;
			  `};

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-300);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 0.8rem;
	}
`;

const Box = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 0.8rem;
`;

const FormRow = ({ label, error, children, wrap = false }) => {
	return (
		<StyledFormRow $wrap={wrap}>
			<Box>
				{label && <Label htmlFor={children?.props?.id}>{label}</Label>}
				{error && <Error>{error}</Error>}
			</Box>
			{children}
		</StyledFormRow>
	);
};

export default FormRow;
