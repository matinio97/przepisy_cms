import Heading from "../ui/Heading";
import UserDataUpdate from "../features/auth/UserDataUpdate";
import UserPasswordUpdate from "../features/auth/UserPasswordUpdate";
import styled from "styled-components";

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (min-width: 768px) {
		padding: 1rem 5vw;
	}
	@media (min-width: 1024px) {
		padding: 1rem 10vw;
	}
`;

const UserAccount = () => {
	return (
		<Layout>
			<Heading as="h3">Edytuj konto</Heading>
			<UserDataUpdate />
			<UserPasswordUpdate />
		</Layout>
	);
};

export default UserAccount;
