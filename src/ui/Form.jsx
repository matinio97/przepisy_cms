import styled from "styled-components";

const Form = styled.form`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.2rem 0.4rem;
	@media (min-width: 425px) {
		padding: 0.4rem 0.8rem;
	}
	@media (min-width: 768px) {
		padding: 0.6rem 1.2rem;
	}
	@media (min-width: 1024px) {
		padding: 1rem 2rem;
	}
	border-radius: var(--border-radius-lg);
`;

export default Form;
