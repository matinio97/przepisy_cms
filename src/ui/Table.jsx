import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
	box-sizing: border-box;
	border: 1px solid var(--color-grey-200);
	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	width: 100%;
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 0.6rem;
	align-items: center;
	transition: none;
	min-width: 700px;
`;

const OverflowBody = styled.div`
	box-sizing: border-box;
	overflow-y: auto;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.2rem 1rem;
	text-align: center;
	background-color: var(--color-grey-50);
	/* z-index: 100; */
	border-bottom: 1px solid var(--color-grey-200);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 700;
	color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 1rem;
	word-break: break-all;
	background-color: ${(props) => props.$bgColor};
	/* word-break: keep-all; */
	text-align: center;
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-200);
	}
`;

const StyledBody = styled.section``;

const Footer = styled.footer`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	padding: 0.3rem 0.6rem;
	@media (min-width: 768px) {
		padding: 0.4rem 0.8rem;
	}
	@media (min-width: 1024px) {
		padding: 0.6rem 1.2rem;
	}
	&:not(:has(*)) {
		display: none;
	}
`;

const Empty = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader role="row" $columns={columns} as="header">
			{children}
		</StyledHeader>
	);
}
function Row({ children, bgColor = null }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow role="row" $bgColor={bgColor} $columns={columns}>
			{children}
		</StyledRow>
	);
}
function Body({ data, render }) {
	if (!data.length) return <Empty>Brak danych do pokazania</Empty>;

	return <StyledBody>{data.map(render)}</StyledBody>;
}

function Overflow({ children }) {
	return <OverflowBody>{children}</OverflowBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
Table.Overflow = Overflow;

export default Table;
