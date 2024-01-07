import styled from "styled-components";
import Heading from "../../ui/Heading";

const Box = styled.div`
	box-sizing: border-box;
	padding: 0.8rem;
	grid-area: ${(props) => props.$gridArea};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	box-shadow: 2px 2px 10px var(--color-grey-300);
	background-color: var(--color-grey-100);
	border-radius: var(--border-radius-sm) var(--border-radius-xl);
	max-height: ${(props) => props.$maxHeight};
`;

const Icon = styled.div`
	height: 50px;
	aspect-ratio: 1/1;
	border-radius: 999px;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: var(--color-${(props) => props.color}-100);

	& svg {
		width: 2rem;
		height: 2rem;
		color: var(--color-${(props) => props.color}-700);
	}
`;

const Stat = ({ title, children, gridArea, icon, color, maxHeight }) => {
	return (
		<Box $gridArea={gridArea} $maxHeight={maxHeight}>
			{icon ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Heading as="h5">{title}</Heading>
					<Icon color={color}>{icon}</Icon>
				</div>
			) : (
				<Heading as="h5">{title}</Heading>
			)}

			<div style={{ width: "100%", textAlign: "center", fontSize: "1.4rem" }}>
				{children}
			</div>
		</Box>
	);
};

export default Stat;
