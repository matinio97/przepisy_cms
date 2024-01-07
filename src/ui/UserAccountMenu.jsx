import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import styled, { css } from "styled-components";
import { useUser } from "../features/auth/useUser";
import Spinner from "./Spinner";
import StyledLink from "./StyledLink";
import { IoHomeOutline } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useWindowWidth } from "../hooks/useWindowWidth";

const Span = styled.span`
	display: none;
	@media (min-width: 768px) {
		display: inline-block;
	}
`;

const UserAccountMenu = () => {
	const location = useLocation();
	const windowWidth = useWindowWidth();
	const currentPath = location.pathname;
	const { isLoading, user } = useUser();
	const options = [
		{ path: `/user-overview`, text: "Twoje konto", icon: <IoHomeOutline /> },
		{ path: `/user-recipes`, text: "Twoje przepisy", icon: <BiFoodMenu /> },
		{
			path: `/user-account`,
			text: "Ustawienia",
			icon: <IoSettingsOutline />,
		},
	];

	const adminOptions = [
		...options,
		{
			path: `/dashboard`,
			text: "Dashboard",
			icon: <MdOutlineDashboardCustomize />,
		},
	];

	if (isLoading) return <Spinner />;

	const isAdmin = user?.user_metadata.role === "administrator";

	return (
		<>
			{(isAdmin ? adminOptions : options).map(({ path, text, icon }, index) => (
				<StyledLink
					to={path}
					$active={path === currentPath ? 1 : 0}
					key={index}>
					{icon} <Span>{text}</Span>
				</StyledLink>
			))}
			{windowWidth >= 375 && <div style={{ flex: 1 }}></div>}
			<BackButton
				text="Strona główna"
				path="/recipes"
				mobile={windowWidth >= 520 ? true : false}
			/>
		</>
	);
};

export default UserAccountMenu;
