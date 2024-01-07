import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useUpdateUserRole } from "../features/auth/useUpdateUserRole";

const StyledWindow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 1rem;

	justify-content: space-between;

	& p {
		color: var(--color-grey-500);
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
`;

function ChangeUserStatus({ user }) {
	const userName = user.user_metadata.userName;
	const userRole = user.user_metadata.role;

	const { updateUserRole, isUpdating } = useUpdateUserRole();
	const userId = user.id;

	return (
		<StyledWindow>
			<Heading as="h3">Zmień uprawnienia użytkownika</Heading>
			{userRole === "administrator" ? (
				<p>
					<b style={{ color: "var(--color-green-700)" }}>
						Usuń uprawnienia administratora&nbsp;
					</b>
					użytkownikowi: <b>{userName}</b>
				</p>
			) : (
				<p>
					<b style={{ color: "var(--color-red-700)" }}>
						Nadaj uprawnienia administratora&nbsp;
					</b>
					użytkownikowi: <b>{userName}</b>
				</p>
			)}
			<b>Operację można potem zmienić.</b>
			<div>
				<Button disabled={isUpdating}>Anuluj</Button>
				{userRole === "administrator" ? (
					<Button
						disabled={isUpdating}
						$variation="success"
						onClick={() =>
							updateUserRole({ id: userId, newRole: "użytkownik" })
						}>
						Usuń uprawnienia
					</Button>
				) : (
					<Button
						disabled={isUpdating}
						$variation="danger"
						onClick={() =>
							updateUserRole({ id: userId, newRole: "administrator" })
						}>
						Nadaj uprawnienia
					</Button>
				)}
			</div>
		</StyledWindow>
	);
}

export default ChangeUserStatus;
