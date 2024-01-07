import React, { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../features/auth/useLogin";
import Logo from "../ui/Logo";
import Form from "../ui/Form";
import FormRowVertical from "../ui/FormRowVertical";
import Input from "../ui/Input";
import Button from "../ui/Button";
import DarkModeToggle from "../ui/DarkModeToggle";
import Heading from "../ui/Heading";
import Error from "../ui/Error";
import LoginLayout from "../ui/LoginLayout";
import StyledLink from "../ui/StyledLink";

const Box = styled.div`
	position: fixed;
	right: 10px;
	top: 10px;
`;

const Login = () => {
	const [email, setEmail] = useState("malpa@malpa.malpa");
	const [password, setPassword] = useState("12345678");
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
			<Form
				style={{
					backdropFilter: "blur(10px)",
					backgroundColor: "var(--backdrop-color)",
					boxShadow: "var(--shadow)",
					width: "30%",
				}}
				onSubmit={handleSubmit}>
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
				<Button variation="secondary">Zaloguj</Button>
				<p style={{ fontWeight: 600 }}>
					Nie masz konta? &nbsp;
					<StyledLink to="/register">Zarejestruj się!</StyledLink>
				</p>
			</Form>
		</LoginLayout>
	);
};

export default Login;
