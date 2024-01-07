import styled from "styled-components";

const LoginLayout = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	background-image: url("./background.jpg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	filter: grayscale(var(--image-grayscale));
	opacity: var(--image-opacity);

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--backdrop-bg-color);
	}
`;

export default LoginLayout;
