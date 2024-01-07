import React from "react";
import { useIngredientsByQuery } from "../features/recipes/useIngredientsByQuery";
import styled from "styled-components";
import toast from "react-hot-toast";

const Box = styled.div`
	box-sizing: border-box;
	border: 1px solid var(--color-grey-300);
	width: 100%;
	border-radius: 5px;
	max-height: 20rem;
	overflow-y: auto;
	position: absolute;
	top: 100%;
	z-index: 999;
`;

const Element = styled.p`
	box-sizing: border-box;
	padding: 0.8rem 1.4rem;
	background-color: var(--color-grey-100);
	&:hover {
		background-color: var(--color-grey-200);
	}
`;

const IngredientsList = ({
	query,
	setQuery,
	showIngredients,
	list,
	setList,
	handleClick,
}) => {
	const { isLoading, searchedIngredients } = useIngredientsByQuery(query);

	if (isLoading) return null;
	if (!showIngredients) return null;

	function handleClick(ingredient) {
		const isIngredientInList = list.some((item) => item.id === ingredient.id);
		if (isIngredientInList) {
			toast.error("Dodałeś już ten składnik do swojej listy");
		} else {
			const newList = [...list, { id: ingredient.id, quantity: "" }];
			setList(newList);
			setQuery("");
		}
	}

	return (
		<Box>
			{searchedIngredients?.map((ingredient) => (
				<Element key={ingredient.id} onClick={() => handleClick(ingredient)}>
					{ingredient.name}
				</Element>
			))}
		</Box>
	);
};

export default IngredientsList;
