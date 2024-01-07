import styled from "styled-components";
import Filter from "../../ui/Filter";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const TableOperations = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
`;

const RecipesOperation = () => {
	return (
		<Filter
			filterField={"recipeStatus"}
			options={[
				{ value: "all", label: "Wszystkie" },
				{ value: "accepted", label: "Zaakceptowane" },
				{ value: "verifying", label: "Weryfikowane" },
				{ value: "rejected", label: "Odrzucone" },
			]}
		/>
	);
};

export default RecipesOperation;
