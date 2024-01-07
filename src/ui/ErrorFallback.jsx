import styled from "styled-components";
import Heading from "./Heading";
// import GlobalStyles from "../styles/GlobalStyles";
import "../index.css";
import Button from "./Button";

const StyledErrorFallback = styled.main`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2rem;
	text-align: center;

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		font-family: "Sono";
		margin-bottom: 2rem;
		color: var(--color-grey-500);
	}
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<>
			<StyledErrorFallback>
				<Box>
					<Heading as="h1">Ktoś tu bawi się w hackera 😉</Heading>
					<p>{error.message}</p>
					<Button size="large" onClick={resetErrorBoundary}>
						Powrót do strony głównej
					</Button>
				</Box>
			</StyledErrorFallback>
		</>
	);
};

export default ErrorFallback;
