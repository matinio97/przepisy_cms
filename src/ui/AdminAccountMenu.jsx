import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import { useUser } from "../features/auth/useUser";
import Spinner from "./Spinner";
import StyledLink from "./StyledLink";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { BiFoodMenu } from "react-icons/bi";
import { useWindowWidth } from "../hooks/useWindowWidth";
import styled from "styled-components";

const Span = styled.span`
	display: none;
	@media (min-width: 768px) {
		display: inline-block;
	}
`;

const AdminAccountMenu = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const { isLoading } = useUser();
	const windowWidth = useWindowWidth();
	const options = [
		{ path: `/dashboard`, text: "Statystyki", icon: <IoStatsChartOutline /> },
		{
			path: `/user-management`,
			text: "Zarządzanie użytkownikami",
			icon: <FiUsers />,
		},
		{
			path: `/recipes-management`,
			text: "Zarządzanie przepisami",
			icon: <BiFoodMenu />,
		},
	];
	if (isLoading) return <Spinner />;

	return (
		<>
			{options.map(({ path, text, icon }, index) => (
				<StyledLink
					to={path}
					$active={path === currentPath ? 1 : 0}
					key={index}>
					{icon} <Span>{text}</Span>
				</StyledLink>
			))}
			{windowWidth >= 375 && <div style={{ flex: 1 }}></div>}
			<BackButton
				text="Twoje konto"
				path="/user-overview"
				mobile={windowWidth >= 520 ? true : false}
			/>
		</>
	);
};

export default AdminAccountMenu;
