import styled from "styled-components";

const Textarea = styled.textarea`
	padding: 0.8rem 1.2rem;
	border: 1px solid var(--color-grey-300);
	border-radius: 5px;
	background-color: var(--color-grey-0);
	color: var(--color-grey-700);
	box-shadow: var(--shadow-sm);
	/* max-width: 100%; */
	width: 100%;
	height: 100px;
	max-height: 30vh;
	overflow: auto;
	resize: vertical;
`;

export default Textarea;
