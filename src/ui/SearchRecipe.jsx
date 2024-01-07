import React, { useEffect } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../context/searchRecipesSlice";
import styled from "styled-components";

const SearchInput = styled(Input)`
	grid-area: search;
	/* width: calc(100% - 2rem); */
	@media (min-width: 1024px) {
		max-width: 30vw;
	}
`;

const SearchRecipe = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(searchRecipe(""));
		};
	}, []);

	return (
		<SearchInput
			placeholder="Wyszukaj przepisów..."
			onChange={(e) => {
				e.target.value.length > 2
					? dispatch(searchRecipe(e.target.value))
					: dispatch(searchRecipe(""));
			}}
		/>
	);
};

export default SearchRecipe;
