import React from "react";
import styled, { css } from "styled-components";
import ToggleDarkMode from "../ui/DarkModeToggle";
import Logo from "../ui/Logo";
import StyledLink from "../ui/StyledLink";

const Layout = styled.div`
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 1rem;
	background-image: url("/welcomePageBackground.jpg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	filter: grayscale(var(--image-grayscale));
	opacity: var(--image-opacity);
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--backdrop-bg-color);
	}
`;

const Box = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;

	align-items: center;
	gap: 1rem;
	padding: 1rem;
	z-index: 999;
	border-radius: var(--border-radius-lg);
	backdrop-filter: blur(10px);
	background-color: var(--backdrop-color);
	box-shadow: var(--shadow);
`;

const P = styled.p`
	text-align: center;
	font-weight: 600;
	font-size: 1.2rem;
`;

const Link = styled(StyledLink)`
	margin-top: 1rem;
	border: 1px solid var(--color-grey-700);
	border-radius: var(--border-radius-sm);
	overflow: hidden;
	${(props) =>
		props.$green &&
		css`
			background-color: var(--color-green-100);
		`}
`;

const WelcomePage = () => {
	return (
		<Layout>
			<Box>
				<div style={{ display: "flex", gap: "1rem" }}>
					<Logo />
					<ToggleDarkMode />
				</div>
				<P>Lubisz gotować?</P>
				<P>Chcesz się tego nauczyć?</P>
				<P>Jesteśmy dla Ciebie! Eksploruj, ucz się oraz dziel z innymi!</P>
				<Link to="/recipes" $green>
					Zaczynamy!
				</Link>
			</Box>
		</Layout>
	);
};

export default WelcomePage;
