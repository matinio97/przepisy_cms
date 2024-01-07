import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";
import { getIngredientById } from "../services/apiRecipes";

const IngredientItemBox = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.4rem;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	@media (min-width: 425px) {
		width: initial;
	}
	border: 1px solid var(--color-grey-400);
	border-radius: 9px;
	padding: 0.2rem 0.6rem;
`;

const Input = styled.input`
	font-size: 0.9rem;
	padding: 0.6rem 0.8rem;
	margin-right: 0.4rem;
	max-width: 70px;

	border: 1px solid var(--color-grey-500);
	border-radius: var(--border-radius-sm);
	outline: none;
	background-color: var(--color-grey-100);
	color: var(--color-grey-700);

	@media (min-width: 425px) {
		max-width: 150px;
	}
	@media (min-width: 768px) {
		max-width: 200px;
	}

	&:focus {
		border-bottom: 1px solid var(--color-green-700);
		background-color: var(--color-grey-100);
	}
`;

const IngredientItem = ({ id, list, setList }) => {
	const itemQuantity = list.filter((item) => item.id === id)[0].quantity;
	const [quantity, setQuantity] = useState(itemQuantity || "");

	const handleDelete = () => {
		const newList = list.filter((item) => item.id !== id);
		setList(newList);
	};

	const handleChange = (e) => {
		setQuantity(e.target.value);
		const newItem = { id, quantity: e.target.value };
		const itemIndex = list.findIndex((item) => item.id === id);

		if (itemIndex !== -1) {
			const newList = [...list];
			newList[itemIndex] = newItem;
			setList(newList);
		}
	};

	const [ingredientName, setIngredientName] = useState([]);

	useEffect(() => {
		const fetchIngredientName = async (id) => {
			const ingredient = await getIngredientById(id);
			setIngredientName(ingredient);
		};
		fetchIngredientName(id);
	}, [id]);

	return (
		<IngredientItemBox>
			<p style={{ fontSize: "1rem" }}>{ingredientName}</p>
			<div style={{ display: "flex" }}>
				<Tooltip text="Wprowadź ilość tego produktu">
					<Input
						placeholder="np. 30g"
						type="text"
						onChange={handleChange}
						value={quantity}
						style={{
							width: `${quantity.length < 6 ? 6 : quantity.length}ch`,
						}}
					/>
				</Tooltip>
				<Tooltip text="Usuń produkt z listy">
					<ButtonIcon onClick={handleDelete} color="--color-red-700">
						<IoMdCloseCircleOutline />
					</ButtonIcon>
				</Tooltip>
			</div>
		</IngredientItemBox>
	);
};

export default IngredientItem;
