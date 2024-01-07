import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignup } from "../features/auth/useSignup";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../ui/LoginLayout";
import Form from "../ui/Form";
import DarkModeToggle from "../ui/DarkModeToggle";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import FormRowVertical from "../ui/FormRowVertical";
import Input from "../ui/Input";
import Button from "../ui/Button";
import StyledLink from "../ui/StyledLink";

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
			<Form
				style={{
					width: "30%",
					backdropFilter: "blur(10px)",
					backgroundColor: "var(--backdrop-color)",
					boxShadow: "var(--shadow)",
				}}
				onSubmit={handleSubmit(onSubmit)}>
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
				<Button variation="secondary">Zarejestruj</Button>
				<p>
					Masz już konto? &nbsp;
					<StyledLink to="/login">Zaloguj się!</StyledLink>
				</p>
			</Form>
		</LoginLayout>
	);
};

export default Register;
