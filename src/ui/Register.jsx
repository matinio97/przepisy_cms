import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignup } from "../features/auth/useSignup";
import { Link, useNavigate } from "react-router-dom";
import LoginLayout from "./LoginLayout";
import Form from "./Form";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import Heading from "./Heading";
import FormRowVertical from "./FormRowVertical";
import Input from "./Input";
import Button from "./Button";

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

const Register = () => {
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;
	const { signup, isLoading } = useSignup();

	const navigate = useNavigate();

	function onSubmit({ userName, email, password }) {
		signup({ userName, email, password }, { onSettled: () => reset });
		navigate("/login");
	}

	return (
		<LoginLayout>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Box onClick={(e) => e.preventDefault()}>
					<DarkModeToggle />
				</Box>
				<Logo />
				<Heading
					as="h4"
					style={{ fontFamily: "Luckiest Guy, cursive", letterSpacing: "1px" }}>
					Rejestracja
				</Heading>
				<FormRowVertical label="Nazwa" error={errors?.userName?.message}>
					<Input
						disabled={isLoading}
						type="text"
						id="userName"
						{...register("userName", { required: "Pole jest wymagane" })}
					/>
				</FormRowVertical>

				<FormRowVertical label="Email" error={errors?.email?.message}>
					<Input
						type="email"
						id="email"
						disabled={isLoading}
						{...register("email", {
							required: "Pole jest wymagane",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Wprowadź poprawny adres email",
							},
						})}
					/>
				</FormRowVertical>

				<FormRowVertical label="Hasło" error={errors?.password?.message}>
					<Input
						type="password"
						id="password"
						disabled={isLoading}
						{...register("password", {
							required: "Pole jest wymagane",
							minLength: {
								value: 8,
								message: "Hasło musi zawierać minimum 8 znaków",
							},
						})}
					/>
				</FormRowVertical>

				<FormRowVertical
					label="Powtórz hasło"
					error={errors?.passwordConfirm?.message}>
					<Input
						type="password"
						id="passwordConfirm"
						disabled={isLoading}
						{...register("passwordConfirm", {
							required: "Pole jest wymagane",
							validate: (value) =>
								value === getValues().password ||
								"Hasła muszą do siebie pasować",
						})}
					/>
				</FormRowVertical>
				<Button $variation="secondary">Zarejestruj</Button>
				<p>
					Masz już konto? &nbsp;
					<StyledLink to="/login">Zaloguj się!</StyledLink>
				</p>
			</StyledForm>
		</LoginLayout>
	);
};

export default Register;
