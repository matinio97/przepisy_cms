import React from "react";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Heading from "../../ui/Heading";
import { useUpdateUserByAdmin } from "./useUpdateUserByAdmin";

const UserPasswordUpdate = ({ isAdminUpdating = false, userToUpdate = {} }) => {
	const { register, handleSubmit, formState, getValues, reset } = useForm();
	const { errors } = formState;

	// const { updateUser, isUpdating } = useUpdateUser();
	const { updateUser, isUpdating } = isAdminUpdating
		? useUpdateUserByAdmin()
		: useUpdateUser();

	const id = userToUpdate?.id;

	function onSubmit({ password }) {
		updateUser(isAdminUpdating ? { password, id } : { password }, {
			onSuccess: reset,
		});
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				border: "1px solid var(--color-grey-400)",
			}}>
			<Heading as="h4" style={{ alignSelf: "flex-start" }}>
				Zmień hasło
			</Heading>
			<FormRow label="Nowe hasło" error={errors?.password?.message}>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={isUpdating}
					{...register("password", {
						required: "Pole wymagane",
						minLength: {
							value: 8,
							message: "Hasło musi mieć conajmniej 8 znaków",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Potwierdź hasło" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					autoComplete="new-password"
					id="passwordConfirm"
					disabled={isUpdating}
					{...register("passwordConfirm", {
						required: "Pole wymagane",
						validate: (value) =>
							getValues().password === value || "Hasła różnią się od siebie",
					})}
				/>
			</FormRow>
			<FormRow>
				<Button type="reset" onClick={reset}>
					Anuluj
				</Button>
				<Button $variation="secondary" disabled={isUpdating}>
					Zmień hasło
				</Button>
			</FormRow>
		</Form>
	);
};

export default UserPasswordUpdate;
