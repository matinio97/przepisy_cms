import React, { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../features/auth/useLogin";
import Logo from "./Logo";
import Form from "./Form";
import FormRowVertical from "./FormRowVertical";
import Input from "./Input";
import Button from "./Button";
import DarkModeToggle from "./DarkModeToggle";
import Heading from "./Heading";
import Error from "./Error";
import LoginLayout from "./LoginLayout";
import { Link } from "react-router-dom";

const StyledForm = styled(Form)`
	backdrop-filter: blur(10px);
	background-color: var(--backdrop-color);
	box-shadow: var(--shadow);
	width: 90%;
	@media (min-width: 425px) {
		width: 80%;
	}
	@media (min-width: 500px) {
		width: 70%;
	}
	@media (min-width: 768px) {
		width: 50%;
	}
	@media (min-width: 1024px) {
		width: 30%;
	}
`;

const StyledLink = styled(Link)`
	color: var(--color-grey-500);
	font-weight: 600;
	font-size: 1.1rem;
`;

const Box = styled.div`
	position: fixed;
	right: 10px;
	top: 10px;
`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState();

	const { login, isLoading } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) {
			setError("Wprowadź poprawne dane");
			return;
		}
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	}

	return (
		<LoginLayout>
			<StyledForm onSubmit={handleSubmit}>
				<Box onClick={(e) => e.preventDefault()}>
					<DarkModeToggle />
				</Box>
				<Logo />
				<Heading
					as="h4"
					style={{ fontFamily: "Luckiest Guy, cursive", letterSpacing: "1px" }}>
					Logowanie
				</Heading>
				<FormRowVertical label="Email">
					<Input
						type="email"
						id="email"
						autoComplete="username"
						disabled={isLoading}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormRowVertical>

				<FormRowVertical label="Hasło">
					<Input
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						disabled={isLoading}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormRowVertical>
				<Error>{error}</Error>
				<Button $variation="secondary">Zaloguj</Button>
				<p style={{ fontWeight: 600 }}>
					Nie masz konta? &nbsp;
					<StyledLink to="/register">Zarejestruj się!</StyledLink>
				</p>
			</StyledForm>
		</LoginLayout>
	);
};

export default Login;
