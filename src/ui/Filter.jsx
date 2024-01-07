import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
	${(props) =>
		props.$gridArea &&
		css`
			grid-area: ${props.$gridArea};
		`}
	box-sizing: border-box;
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	@media (min-width: 768px) {
		flex-wrap: nowrap;
	}
	justify-content: space-evenly;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	box-sizing: border-box;
	background-color: var(--color-grey-0);
	color: var(--color-grey-700);
	border: none;
	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-size: 1rem;
	padding: 0.7rem 0.6rem;
	transition: all 0.3s;
	width: 48%;
	@media (min-width: 768px) {
		min-width: 24%;
	}
	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
		border-radius: var(--border-radius-sm);
	}
`;

const Filter = ({ filterField, options, gridArea }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	function handleClick(value) {
		searchParams.set(filterField, value);
		if (searchParams.get("page")) searchParams.set("page", 1);
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter $gridArea={gridArea}>
			{options.map(({ label, value }, index) => (
				<FilterButton
					onClick={() => handleClick(value)}
					key={index}
					active={value === currentFilter ? 1 : 0}
					disabled={value === currentFilter}>
					{label}
				</FilterButton>
			))}
		</StyledFilter>
	);
};

export default Filter;
