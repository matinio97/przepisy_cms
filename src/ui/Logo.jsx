import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.h1`
	user-select: none;
	font-family: "Luckiest Guy", cursive;
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: ${(props) => (props.size ? props.size : "2.5rem")};
	background-image: url("/logo-2.jpg");
	background-size: cover;
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
	-webkit-text-stroke: 0.5px var(--color-blue-700);
	width: min-content;
	&:hover {
		cursor: pointer;
	}
`;

const Logo = ({ size }) => {
	const navigate = useNavigate();

	return (
		<div style={{ gridArea: "logo" }}>
			<StyledLogo size={size} onClick={() => navigate("/recipes")}>
				Przepisy
			</StyledLogo>
		</div>
	);
};

export default Logo;
