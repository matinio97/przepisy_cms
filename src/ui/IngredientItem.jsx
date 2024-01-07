import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import ButtonIcon from "./ButtonIcon";
import { HiCheck } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import { useAcceptIngredient } from "../features/recipes/useAcceptIngredient";
import { useDeleteIngredient } from "../features/recipes/useDeleteIngredient";

const Item = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid var(--color-grey-300);
	gap: 0.8rem;
	padding: 0.4rem 0.8rem;
	height: min-content;
	&:hover {
		background-color: var(--color-grey-200);
	}
	transition: all 0.3s;
`;

const IngredientItem = ({ ingredient }) => {
	const [value, setValue] = useState(ingredient.name);
	const { acceptIngredient, isAccepting } = useAcceptIngredient();
	const { deleteIngredient, isDeleting } = useDeleteIngredient();

	const isChanging = isAccepting || isDeleting;

	return (
		<Item>
			{ingredient.isAccepted ? (
				ingredient.name
			) : (
				<>
					<Input
						type="text"
						value={value}
						disabled={isChanging}
						onChange={(e) => setValue(e.target.value)}
					/>
					<ButtonIcon
						color="--color-green-700"
						onClick={() => acceptIngredient(ingredient.id)}
						disabled={isChanging}>
						<HiCheck />
					</ButtonIcon>
					<ButtonIcon
						color="--color-red-700"
						onClick={() => deleteIngredient(ingredient.id)}
						disabled={isChanging}>
						<HiOutlineX />
					</ButtonIcon>
				</>
			)}
		</Item>
	);
};

export default IngredientItem;
