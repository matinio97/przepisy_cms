import React, { useState } from "react";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";
import Heading from "../../ui/Heading";
import { useUpdateUserByAdmin } from "./useUpdateUserByAdmin";

const UserDataUpdate = ({ isAdminUpdating = false, userToUpdate = {} }) => {
	const { user } = useUser();

	const email = isAdminUpdating ? userToUpdate.email : user.email;

	const currentUserName = isAdminUpdating
		? userToUpdate.user_metadata.userName
		: user.user_metadata.userName;

	const id = userToUpdate?.id;

	const { updateUser, isUpdating } = isAdminUpdating
		? useUpdateUserByAdmin()
		: useUpdateUser();

	const [userName, setUserName] = useState(currentUserName);
	const [avatar, setAvatar] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (userName.length < 3) {
			toast.error(
				"Minimalna długość nazwy użytkownika powinna być dłuższa niż 3. Zmiany nie zostały zapisane."
			);
			return;
		}
		updateUser(
			isAdminUpdating ? { userName, avatar, id } : { userName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.reset();
				},
			}
		);
	}

	function handleReset() {
		setUserName(currentUserName);
		setAvatar(null);
	}

	return (
		<Form
			onSubmit={handleSubmit}
			style={{
				border: "1px solid var(--color-grey-400)",
			}}>
			<Heading as="h4" style={{ alignSelf: "flex-start" }}>
				Aktualizuj dane
			</Heading>
			<FormRow label="Email">
				<Input
					value={email}
					disabled
					style={{
						cursor: "no-drop",
						backgroundColor: "var(--color-grey-200)",
					}}
				/>
			</FormRow>
			<FormRow label="Nazwa">
				<Input
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					id="userName"
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Avatar">
				<FileInput
					id="avatar"
					accept="image/*"
					onChange={(e) => {
						setAvatar(e.target.files[0]);
					}}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<Button type="reset" disabled={isUpdating} onClick={handleReset}>
					Anuluj
				</Button>
				<Button $variation="secondary" disabled={isUpdating}>
					Aktualizuj
				</Button>
			</FormRow>
		</Form>
	);
};

export default UserDataUpdate;
