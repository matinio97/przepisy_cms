import styled from "styled-components";
import Error from "./Error";
import Label from "./Label";

const StyledFormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	width: 100%;
`;

function FormRowVertical({ label, error, children }) {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

export default FormRowVertical;
