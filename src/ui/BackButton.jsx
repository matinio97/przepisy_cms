import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowBack } from "react-icons/io";

const Button = styled.button`
	border: none;
	display: flex;
	gap: 0.5rem;
	align-items: center;
	font-weight: 600;
	background-color: transparent;
	color: var(--color-grey-700);
	padding: 0.6rem 1rem;
	transition: all 0.3s;
	&:hover {
		background-color: var(--color-grey-300);
	}
	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}
`;

const BackButton = ({ text, path, mobile = true }) => {
	const navigate = useNavigate();

	return (
		<Button onClick={() => navigate(path || -1)}>
			<IoMdArrowBack /> {mobile && (text || "Cofnij")}
		</Button>
	);
};

export default BackButton;
