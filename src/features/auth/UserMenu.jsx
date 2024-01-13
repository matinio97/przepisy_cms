import React from "react";
import { useUser } from "./useUser";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { BiLogOut } from "react-icons/bi";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import { DEFAULT_USER_AVATAR } from "../../context/variables";
import StyledLink from "../../ui/StyledLink";
import DarkModeToggle from "../../ui/DarkModeToggle";

const Box = styled.div`
	/* grid-area: menu; */
	display: flex;
	flex-direction: row;
	gap: 0.6rem;
	/* justify-content: center; */
	justify-content: flex-end;
	align-items: center;
	/* cursor: pointer; */
`;

const Image = styled.img`
	width: 30px;
	aspect-ratio: 1 / 1;
	border-radius: 999px;
	border: 2px solid var(--color-brand-600);
`;

const P = styled.p`
	min-width: max-content;
	display: none;
	@media (min-width: 512px) {
		display: inline-block;
	}
`;

const UserMenu = () => {
	const { isLoading, user, isAuth } = useUser();
	const { isLoading: isLogouting, logout } = useLogout();
	const navigate = useNavigate();

	if (isLoading) return <SpinnerMini />;

	if (!isAuth)
		return (
			<Box style={{ gridArea: "menu" }}>
				<StyledLink to="/login">Zaloguj</StyledLink>
				<DarkModeToggle />
			</Box>
		);

	const userAvatar = user.user_metadata.avatar || DEFAULT_USER_AVATAR;
	const userName = user.user_metadata.userName || "";

	return (
		<Box style={{ gridArea: "menu" }}>
			<Box
				onClick={() => navigate(`/user-overview`)}
				style={{ cursor: "pointer" }}>
				<Image src={userAvatar} />
				<P style={{ minWidth: "max-content" }}>{userName}</P>
			</Box>
			<ButtonIcon disabled={isLogouting} onClick={logout}>
				<BiLogOut />
			</ButtonIcon>

			<DarkModeToggle />
		</Box>
	);
};

export default UserMenu;
