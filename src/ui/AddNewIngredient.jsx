import React, { useState } from "react";
import Label from "./Label";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useCreateIngredient } from "../features/recipes/useCreateIngredient";

const Box = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const Row = styled.div`
	display: flex;
	gap: 0.8rem;
	width: min-content;
	align-items: center;
`;

const StyledInput = styled(Input)`
	width: 170px;
	@media (min-width: 375px) {
		width: 200px;
	}
	@media (min-width: 425px) {
		width: 260px;
	}
`;

const AddNewIngredient = () => {
	const [value, setValue] = useState("");
	const { createIngredient, isCreating } = useCreateIngredient();

	function handleClick(e) {
		e.preventDefault();
		if (value.length > 2) {
			createIngredient(value);
			setValue("");
			toast.success(
				"Administrator otrzymał powiadomienie o brakującym składniku"
			);
		} else {
			toast.error("Wpisz minimum 3 znaki");
		}
	}

	return (
		<Box>
			<Label>Nie znalazłeś składnika?</Label>
			<p>
				Wpisz jego nazwę i wyślij! Administrator wkrótce doda go do bazy danych
				😁
			</p>
			<Row>
				<StyledInput
					type="text"
					placeholder="Wpisz minimum 3 znaki"
					value={value}
					disabled={isCreating}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button
					$variation="secondary"
					style={{ height: "min-content" }}
					disabled={isCreating}
					onClick={(e) => handleClick(e)}>
					Wyślij
				</Button>
			</Row>
		</Box>
	);
};

export default AddNewIngredient;
