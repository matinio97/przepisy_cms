import React, { forwardRef, useEffect, useState } from "react";
import IngredientsList from "./IngredientsList";
import Input from "./Input";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import IngredientItem from "./IngredientItemBox";

const SearchBox = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
	position: relative;
	box-sizing: border-box;
`;
const IngredientsBox = styled.div`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
`;

const SearchIngredient = forwardRef(({ setValue, id, list, setList }, ref) => {
	const [query, setQuery] = useState("");
	const [showIngredients, setShowIngredients] = useState(true);

	const outsideClickRef = useOutsideClick(() => {
		setTimeout(() => {
			setShowIngredients(false);
		}, 50);
	});

	useEffect(() => {
		ref.current = outsideClickRef.current;
	}, [outsideClickRef, ref]);

	useEffect(() => {
		setValue("ingredients", list);
	}, [list]);

	return (
		<>
			<SearchBox>
				<Input
					style={{ minWidth: "250px" }}
					type="text"
					value={query}
					placeholder="Wyszukaj składników..."
					onChange={(e) => {
						setQuery(e.target.value);
						setShowIngredients(true);
					}}
					onClick={() => setShowIngredients(true)}
					ref={outsideClickRef}
					id={id}
				/>
				{query.length > 2 && (
					<IngredientsList
						key={query}
						setQuery={setQuery}
						query={query}
						list={list}
						setList={setList}
						showIngredients={showIngredients}
					/>
				)}
			</SearchBox>
			<IngredientsBox>
				{list.map((element) => (
					<IngredientItem
						key={element.id}
						id={element.id}
						list={list}
						setList={setList}
					/>
				))}
			</IngredientsBox>
		</>
	);
});

export default SearchIngredient;
