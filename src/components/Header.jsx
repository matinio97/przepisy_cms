import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import UserMenu from "../features/auth/UserMenu";
import SearchRecipe from "../ui/SearchRecipe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { changeShowDashboard } from "../context/dashboardSlice";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const StyledHeader = styled.header`
	box-sizing: border-box;
	display: grid;
	grid-template-areas:
		"logo menu"
		"search search";
	@media (min-width: 768px) {
		grid-template-areas: "logo search menu";
	}
	gap: 0.5rem;
	padding: 0.6rem 0.8rem;
	border-bottom: 1px solid var(--color-grey-400);
	box-shadow: var(--shadow-md);
`;

const Header = ({ windowWidth }) => {
	const sidebarOption = useSelector((store) => store.sidebar.sidebarOption);
	const showDashboard = useSelector((store) => store.dashboard.showDashboard);
	const [logoSize, setLogoSize] = useState();
	const location = useLocation();
	const { pathname } = location;
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			pathname === "/dashboard" ||
			pathname === "/user-management" ||
			pathname === "/recipes-management"
		)
			dispatch(changeShowDashboard(true));
		else dispatch(changeShowDashboard(false));
	}, [pathname]);

	useEffect(() => {
		setLogoSize(
			windowWidth < 320
				? "1.4rem"
				: windowWidth >= 320 && windowWidth < 425
				? "1.8rem"
				: "2.5rem"
		);
	}, [windowWidth]);

	return (
		<StyledHeader>
			<Logo size={logoSize} />
			<UserMenu />
			{showDashboard && (
				<Heading
					as="h4"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "0.5rem",
						gridArea: "search",
					}}>
					<MdOutlineDashboardCustomize
						style={{ height: "1.8rem", width: "1.8rem" }}
					/>
					DASHBOARD
				</Heading>
			)}
			{sidebarOption === "filterSorter" && <SearchRecipe />}
		</StyledHeader>
	);
};

export default Header;
