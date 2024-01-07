import styled from "styled-components";
import BackButton from "../ui/BackButton";
import FilterSorter from "../ui/FilterSorter";
import { useSelector } from "react-redux";
import UserAccountMenu from "../ui/UserAccountMenu";
import AdminAccountMenu from "../ui/AdminAccountMenu";

const StyledSidebar = styled.div`
	box-sizing: border-box;
	overflow-x: auto;
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid var(--color-grey-400);
	justify-content: space-between;

	@media (min-width: 768px) {
		gap: 0.5rem;
		width: 220px;
		box-sizing: border-box;
		flex-direction: column;
		max-height: none;
		border-bottom: none;
		border-right: 1px solid var(--color-grey-400);
		box-shadow: var(--shadow-md);
	}
`;

const Sidebar = () => {
	const sidebarOption = useSelector((store) => store.sidebar.sidebarOption);

	return (
		<StyledSidebar>
			{sidebarOption === "filterSorter" && <FilterSorter />}
			{sidebarOption === "backButton" && (
				<BackButton text="Strona główna" path="/recipes" />
			)}
			{sidebarOption === "userAccountMenu" && <UserAccountMenu />}
			{sidebarOption === "adminAccountMenu" && <AdminAccountMenu />}
		</StyledSidebar>
	);
};

export default Sidebar;
