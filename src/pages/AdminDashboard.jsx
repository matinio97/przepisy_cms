import React from "react";
import Heading from "../ui/Heading.jsx";
import styled from "styled-components";
import { useRecipes } from "../features/recipes/useRecipes.js";
import Spinner from "../ui/Spinner.jsx";
import { useUserList } from "../features/auth/useUserList.js";
import Stats from "../features/dashboard/Stats.jsx";
import Charts from "../features/dashboard/Charts.jsx";
import AdminList from "../features/dashboard/AdminList.jsx";

const Layout = styled.div`
	display: grid;
	gap: 0.5rem;

	grid-template-columns: 1fr;
	grid-template-areas:
		"RAC"
		"RVC"
		"IAC"
		"IVC"
		"RLC"
		"RBC"
		"UC"
		"AL";

	@media (min-width: 425px) {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			"RAC RVC"
			"IAC IVC"
			"RLC RLC"
			"RBC RBC"
			"UC UC"
			"AL AL";
	}

	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-areas:
			"RAC RVC IAC IVC"
			"RLC RLC RLC UC"
			"RLC RLC RLC AL"
			"RBC RBC RBC AL"
			"RBC RBC RBC .";
	}
`;

const AdminDashboard = () => {
	const { isLoading: isLoadingUsers, users } = useUserList();
	const { isLoading: isLoadingRecipes, recipes } = useRecipes();

	const isLoading = isLoadingUsers || isLoadingRecipes;

	if (isLoading) return <Spinner />;

	const admins = users?.filter(
		(user) => user.user_metadata.role === "administrator"
	);

	return (
		<>
			<Heading as="h3" style={{ marginBottom: "1rem" }}>
				Statystyki
			</Heading>
			<Layout>
				<Stats />
				<Charts recipes={recipes} />
				<AdminList admins={admins} />
			</Layout>
		</>
	);
};

export default AdminDashboard;
