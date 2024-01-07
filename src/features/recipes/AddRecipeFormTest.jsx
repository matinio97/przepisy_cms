import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import SearchIngredient from "../../ui/SearchIngredient";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";

const AddRecipeFormTest = () => {
	const [ingredientsList, setIngredientsList] = useState([]);
	const { register, handleSubmit, reset, formState, setValue, setError } =
		useForm();
	const { errors } = formState;

	function onSubmit(data) {
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
			console.log(data.ingredients);
		}
	}

	function onError(error) {
		console.log(error);
	}

	useEffect(() => {
		setValue("ingredients", ingredientsList);
	}, [ingredientsList]);

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRowVertical label="Składniki" error={errors?.ingredients?.message}>
				<SearchIngredient
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

			<FormRow>
				<Button type="reset">Anuluj</Button>
				<Button variation="secondary">Dodaj</Button>
			</FormRow>
		</Form>
	);
};

export default AddRecipeFormTest;
