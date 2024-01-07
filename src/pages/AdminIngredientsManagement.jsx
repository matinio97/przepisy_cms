import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "../ui/Filter";
import Spinner from "../ui/Spinner";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { usePreparePageParam } from "../hooks/usePreparePageParam";
import Pagination from "../ui/Pagination";
import { useIngredients } from "../features/recipes/useIngredients";
import { useCreateIngredient } from "../features/recipes/useCreateIngredient";
import IngredientItem from "../ui/IngredientItem";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { searchIngredient } from "../context/searchIngredientSlice";

const Layout = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const OptionsLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas: "newIngredient" "addButton" "." "searchIngredient" "filter";
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	@media (min-width: 525px) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-areas:
			"newIngredient newIngredient addButton"
			"searchIngredient filter filter";
	}
	@media (min-width: 1024px) {
		grid-template-columns: repeat(8, 1fr);
		grid-template-areas: "newIngredient newIngredient addButton searchIngredient searchIngredient filter filter filter";
	}

	@media (min-width: 1440px) {
		grid-template-columns: repeat(10, 1fr);
		grid-template-areas: "newIngredient newIngredient addButton . searchIngredient searchIngredient . filter filter filter";
	}
`;

const Box = styled.div`
	display: flex;
	gap: 0.4rem;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow-y: auto;
`;

const HorizontalLine = styled.div`
	border-bottom: 1px solid var(--color-grey-400);
	margin-top: 10px;
	margin-bottom: 10px;
`;

const AdminIngredientsManagement = () => {
	const options = [{ value: 100 }, { value: 200 }, { value: 300 }];
	const pageSizeKey = "adminIngredientsPageSize";
	const [pageSize, setPageSize] = usePreparePageParam(pageSizeKey, options);
	const { isLoading, ingredients, count } = useIngredients(pageSize, true);
	const { createIngredient, isCreating } = useCreateIngredient();
	const [value, setValue] = useState("");
	const dispatch = useDispatch();

	function handleClick(e) {
		e.preventDefault();
		if (value.length >= 2) {
			createIngredient(value);
			toast.success("Składnik został dodany, musisz go teraz zatwierdzić");
			setValue("");
		} else {
			toast.error("Nazwa powinna składać się z conajmniej 3 znaków");
		}
	}

	useEffect(() => {
		return () => {
			dispatch(searchIngredient(""));
		};
	}, []);

	return (
		<Layout>
			<OptionsLayout>
				<Input
					placeholder="Dodaj nowy składnik"
					value={value}
					disabled={isCreating}
					onChange={(e) => setValue(e.target.value)}
					id="createIngredient"
					style={{
						gridArea: "newIngredient",
						maxWidth: "100%",
					}}
				/>
				<Button
					$variation="success"
					onClick={handleClick}
					disabled={isCreating}
					style={{ gridArea: "addButton" }}>
					Dodaj
				</Button>

				<Input
					type="text"
					placeholder="wyszukaj..."
					style={{
						gridArea: "searchIngredient",
						maxWidth: "100%",
					}}
					onChange={(e) => {
						e.target.value.length > 2
							? dispatch(searchIngredient(e.target.value))
							: dispatch(searchIngredient(""));
					}}
				/>

				<Filter
					gridArea="filter"
					filterField={"isAccepted"}
					options={[
						{ value: "true", label: "Zaakceptowane" },
						{ value: "false", label: "Weryfikowane" },
					]}
				/>
			</OptionsLayout>
			<HorizontalLine />
			<>
				<Box>
					{ingredients?.length > 0 ? (
						ingredients?.map((ingredient) => (
							<IngredientItem key={ingredient.id} ingredient={ingredient} />
						)) || <Spinner />
					) : (
						<p style={{ padding: "1rem", margin: "0 auto" }}>
							Brak takich składników
						</p>
					)}
				</Box>
				<HorizontalLine />
				<Pagination
					count={count}
					pageSize={pageSize}
					options={options}
					pageSizeKey={pageSizeKey}
					setPageSize={setPageSize}
				/>
			</>
		</Layout>
	);
};

export default AdminIngredientsManagement;
