import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PageSize from "./PageSize";
import { useEffect } from "react";

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.2rem;

	& b {
		font-size: 1.2rem;
	}
`;

const Span = styled.span`
	display: none;
	@media (min-width: 1024px) {
		display: inline-block;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};

	border: none;
	border-radius: var(--border-radius-sm);

	display: flex;
	align-items: center;
	gap: 0.2rem;
	padding: 0.4rem 0.4rem;

	transition: all 0.3s;
	@media (min-width: 768px) {
		padding: 0.6rem 1.2rem;
	}

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& span {
		@media (min-width: 768px) {
			display: inline-block;
		}
	}

	& svg {
		height: 1.6rem;
		width: 1.6rem;
	}

	&:hover:disabled {
		cursor: no-drop;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

export default function Pagination({
	count,
	pageSize,
	options,
	pageSizeKey,
	setPageSize,
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = searchParams.get("page")
		? Number(searchParams.get("page"))
		: 1;

	const pageCount = Math.ceil(count / pageSize) || 1;

	function nextPage() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;
		searchParams.set("page", next);
		setSearchParams(searchParams);
	}

	function prevPage() {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;
		const value = prev < 1 ? 1 : prev;
		searchParams.set("page", value);
		setSearchParams(searchParams);
	}

	return (
		<StyledPagination>
			<P>
				{count ? (
					<>
						<Span>Pozycje</Span> <b>{(currentPage - 1) * pageSize + 1}</b> -{" "}
						<b>{currentPage === pageCount ? count : currentPage * pageSize}</b>{" "}
						z <b>{count}</b> <Span>wyników</Span>
					</>
				) : (
					"Brak wyników"
				)}
			</P>

			<PageSize
				options={options}
				pageSizeKey={pageSizeKey}
				setPageSize={setPageSize}
			/>

			<Buttons>
				<PaginationButton onClick={prevPage} disabled={currentPage === 1}>
					<HiChevronLeft /> <Span>Poprzednia</Span>
				</PaginationButton>
				<PaginationButton
					onClick={nextPage}
					disabled={currentPage === pageCount}>
					<Span>Następna</Span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}
