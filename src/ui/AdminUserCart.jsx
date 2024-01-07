import React from "react";
import Table from "./Table";
import { DEFAULT_USER_AVATAR } from "../context/variables";
import styled, { css } from "styled-components";
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import ButtonIcon from "./ButtonIcon";
import ConfirmDelete from "./ConfirmDelete";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteUser } from "../features/auth/useDeleteUser";
import ChangeUserStatus from "./ChangeUserStatus";
import { CiSettings } from "react-icons/ci";
import UserPasswordUpdate from "../features/auth/UserPasswordUpdate";
import UserDataUpdate from "../features/auth/UserDataUpdate";
const variations = {
	accepted: css`
		color: var(--color-grey-50);
		background-color: var(--color-green-700);
	`,
	rejected: css`
		color: var(--color-grey-50);
		background-color: var(--color-red-700);
	`,
	verifying: css`
		color: var(--color-grey-50);
		background-color: var(--color-yellow-700);
	`,
};

const Status = styled.div`
	margin: auto;
	padding: 10px 20px;
	width: max-content;
	border-radius: 999px;
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => variations[props.$status]}
`;

Status.defaultProps = {
	$status: "verifying",
};

const ActionsBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
`;

const Image = styled.img`
	margin: auto;
	width: 3rem;
	aspect-ratio: 1 / 1;
	object-fit: cover;
	border-radius: 999px;
`;

const AdminUserCart = ({ user, id }) => {
	const { isDeletingUser, deleteUser } = useDeleteUser();

	if (isDeletingUser) return <Spinner />;

	return (
		<Table.Row bgColor={user.id === id && "var(--color-grey-300)"}>
			<Image src={user.user_metadata.avatar || DEFAULT_USER_AVATAR} />
			<p>{user.user_metadata.userName}</p>
			<p>{user.email}</p>
			<Status
				$status={
					user.user_metadata.role === "administrator" ? "rejected" : "accepted"
				}>
				{user.user_metadata.role || "użytkownik"}
			</Status>

			<Modal>
				<ActionsBox>
					<Tooltip text="Zarządzaj danymi">
						<Modal.Open opens="changeUserData">
							<ButtonIcon color="--color-green-700">
								<CiSettings />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>

					<Tooltip text="Zmień uprawnienia">
						<Modal.Open opens="changeUserRole">
							<ButtonIcon color="--color-blue-700">
								<TbStatusChange />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>

					<Tooltip text="Usuń użytkownika">
						<Modal.Open opens="deleteUser">
							<ButtonIcon color="--color-red-700">
								<AiOutlineDelete />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>
				</ActionsBox>

				<Modal.Window name="changeUserData">
					<div
						style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
						<UserDataUpdate isAdminUpdating={true} userToUpdate={user} />
						<UserPasswordUpdate isAdminUpdating={true} userToUpdate={user} />
					</div>
				</Modal.Window>
				<Modal.Window name="changeUserRole">
					<ChangeUserStatus user={user} />
				</Modal.Window>
				<Modal.Window name="deleteUser">
					<ConfirmDelete
						resourceName={` użytkownik ${user.user_metadata.userName}`}
						toDelete="użytkownika"
						disabled={isDeletingUser}
						onConfirm={() => deleteUser(user.id)}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
};

export default AdminUserCart;
