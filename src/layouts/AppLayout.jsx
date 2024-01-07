import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import ButtonIcon from "../ui/ButtonIcon";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { useWindowWidth } from "../hooks/useWindowWidth";

const StyledAppLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	position: relative;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const FilterButton = styled(ButtonIcon)`
	width: 2.4rem;
	height: 2.4rem;
	border: 1px solid var(--color-brand-600);
	background-color: var(--color-grey-100);
	z-index: 999;
	border-radius: 999px;
	position: absolute;
	right: 15px;
	top: 10px;
`;

const AppLayout = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const sidebarOption = useSelector((store) => store.sidebar.sidebarOption);
	const windowWidth = useWindowWidth();
	const breakPoint = 768;

	return (
		<StyledAppLayout>
			<Header windowWidth={windowWidth} />
			<Container>
				{windowWidth >= breakPoint ? (
					<Sidebar />
				) : (
					sidebarOption === "filterSorter" && (
						<FilterButton onClick={() => setShowSidebar(!showSidebar)}>
							{showSidebar ? <AiOutlineClose /> : <AiOutlineFilter />}
						</FilterButton>
					)
				)}
				{(showSidebar || sidebarOption !== "filterSorter") &&
					windowWidth < breakPoint && <Sidebar />}
				<Main>
					<Outlet />
				</Main>
			</Container>
		</StyledAppLayout>
	);
};

export default AppLayout;
