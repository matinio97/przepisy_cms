import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// wychodzenie poza ekran: https://stackoverflow.com/questions/64943297/how-to-prevent-tooltip-going-out-of-screen-reactjs

const Box = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	justify-content: center;
`;

const TooltipBox = styled.div`
	position: absolute;
	top: calc(-${(props) => props.height} - 10px);
	background-color: var(--color-grey-700);
	color: var(--color-grey-100);
	z-index: 999;
	padding: 5px;
	/* width: min-content; */

	width: max-content;
	max-width: 300px;
	border-radius: 5px;

	/* @media (min-width: 1024px) {
		width: max-content;
		max-width: 300px;
	} */
`;

const Tooltip = ({ children, text }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.clientHeight);
		}
	});

	return (
		<Box
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}>
			{children}
			{showTooltip && (
				<TooltipBox ref={ref} height={`${height}px`}>
					{text}
				</TooltipBox>
			)}
		</Box>
	);
};

export default Tooltip;
