import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useCreateRecipe } from "./useCreateRecipe";
import { useUser } from "../auth/useUser";
import { useEditRecipe } from "./useEditRecipe";
import toast from "react-hot-toast";
import FormRowVertical from "../../ui/FormRowVertical";
import SearchIngredient from "../../ui/SearchIngredient";
import { useState } from "react";
import { shallowEqual } from "../../context/functions";
import AddNewIngredient from "../../ui/AddNewIngredient";

const Form = styled.form`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(0px);
`;

const StyledSelect = styled.select`
	background-color: var(--color-grey-0);
	color: var(--color-grey-700);
	padding: 10px 20px;
	text-align: center;
	border-radius: var(--border-radius-lg);
`;

const AddRecipeForm = ({ onCloseModal, recipeToEdit = {}, id }) => {
	const { isCreating, createRecipe } = useCreateRecipe();
	const { isEditing, editRecipe } = useEditRecipe();
	const { user } = useUser();
	const isLoading = isCreating || isEditing;
	const userId = user.id;

	const isEditSession = Boolean(id);

	const [ingredientsList, setIngredientsList] = useState(
		!shallowEqual(recipeToEdit, {}) ? JSON.parse(recipeToEdit.ingredients) : []
	);

	const { register, handleSubmit, reset, formState, setValue, setError } =
		useForm({
			defaultValues: isEditSession
				? { ...recipeToEdit, ingredients: ingredientsList }
				: {},
		});

	const { errors } = formState;

	if (isLoading) return <Spinner />;

	const onSubmit = (data) => {
		let isCorrect = false;

		data.ingredients.map((element) => {
			if (element.quantity === "") {
				isCorrect = false;
				setError("ingredients", {
					message:
						"Nie wprowadziłeś ilości składników potrzebnych do twojego przepisu",
				});
			} else isCorrect = true;
		});

		if (isCorrect) {
			const image =
				typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl[0];

			if (isEditSession) {
				if (
					shallowEqual(
						{ ...data, ingredients: JSON.stringify(data.ingredients) },
						recipeToEdit
					)
				) {
					reset();
					toast.error("Nie wprowadziłeś/aś żadnych zmian w przepisie!");
				} else {
					editRecipe(
						{
							newRecipeData: {
								...data,
								imageUrl: image,
								ingredients: JSON.stringify(data.ingredients),
							},
							id,
						},
						{
							onSuccess: () => {
								reset();
								onCloseModal?.();
							},
						}
					);
				}
			} else {
				createRecipe(
					{
						...data,
						imageUrl: image,
						author: userId,
						ingredients: JSON.stringify(data.ingredients),
					},
					{
						onSuccess: () => {
							reset();
							onCloseModal?.();
						},
					}
				);
			}
		}
	};

	function onError(error) {
		console.log(error);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<Heading as="h4">
				{isEditSession ? "Edytuj przepis" : "Dodaj nowy przepis"}
			</Heading>

			<FormRow label="Nazwa przepisu:" error={errors?.recipeName?.message}>
				<Input
					type="text"
					id="recipeName"
					style={{ width: "100%" }}
					{...register("recipeName", { required: "Pole wymagane" })}
				/>
			</FormRow>

			<FormRow
				label="Czas przygotowania (min):"
				error={errors?.timeToPrepare?.message}>
				<Input
					type="number"
					id="timeToPrepare"
					style={{ width: "100%" }}
					{...register("timeToPrepare", {
						required: "Pole wymagane",
						min: { value: 1, message: "Nieprawidłowa wartość" },
					})}
				/>
			</FormRow>

			<FormRow label="Liczba porcji" error={errors?.servingsNumber?.message}>
				<Input
					type="number"
					id="servingsNumber"
					style={{ width: "100%" }}
					{...register("servingsNumber", {
						required: "Pole wymagane",
						min: { value: 1, message: "Nieprawidłowa wartość" },
					})}
				/>
			</FormRow>

			<FormRow label="Rodzaj dania:">
				<StyledSelect id="type" {...register("type")}>
					<option value="meat">Danie mięsne</option>
					<option value="salad">Sałatka/surówka</option>
					<option value="fish">Danie rybne</option>
					<option value="soup">Zupa</option>
					<option value="dessert">Deser</option>
					<option value="drink">Napój</option>
					<option value="other">Inne</option>
				</StyledSelect>
			</FormRow>

			<FormRowVertical label="Składniki" error={errors?.ingredients?.message}>
				<SearchIngredient
					setValue={setValue}
					id="ingredients"
					{...register("ingredients", {
						required: "Pole wymagane",
						validate: (value) =>
							value.length >= 2 || "Wymagane są conajmniej dwa składniki",
					})}
					setList={setIngredientsList}
					list={ingredientsList}
				/>
			</FormRowVertical>

			<AddNewIngredient />

			<FormRow
				label="Sposób przygotowania:"
				error={errors?.methodOfPreparing?.message}>
				<Textarea
					id="methodOfPreparing"
					{...register("methodOfPreparing", { required: "Pole wymagane" })}
				/>
			</FormRow>

			<FormRow label="Ogólny opis dania (opcjonalnie):">
				<Textarea id="description" {...register("description")} />
			</FormRow>

			<FormRow label="Zdjęcie:" error={errors?.imageUrl?.message}>
				<FileInput
					id="imageUrl"
					accept="image/*"
					{...register("imageUrl", {
						required: isEditSession ? false : "Pole wymagane",
					})}
				/>
			</FormRow>
			<FormRow>
				<Button
					type="reset"
					onClick={() => onCloseModal?.()}
					$variation="danger">
					Anuluj
				</Button>
				<Button $variation="success">
					{isEditSession ? "Edytuj" : "Dodaj"}
				</Button>
			</FormRow>
		</Form>
	);
};

export default AddRecipeForm;
