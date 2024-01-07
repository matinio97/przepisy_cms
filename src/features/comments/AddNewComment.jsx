import React from "react";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreateComment } from "./useCreateComment";
import FileInput from "../../ui/FileInput";

const AddNewComment = ({ onCloseModal, recipeName, authorId, recipeId }) => {
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const { isCreating, createComment } = useCreateComment();

	const onSubmit = (formData) => {
		const image =
			typeof formData.imageUrl === "string"
				? formData.imageUrl
				: formData.imageUrl[0];

		const data = {
			comment: formData.comment,
			recipeId,
			authorId,
			imageUrl: image || "",
		};
		createComment(data);
		onCloseModal?.();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				marginTop: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
			}}>
			<FormRow
				label={`Dodaj komentarz do przepisu '${recipeName}':`}
				error={errors?.comment?.message}>
				<Textarea
					placeholder="Wprowadź komentarz"
					id="comment"
					{...register("comment", {
						required: "Pole wymagane",
						validate: (value) =>
							value.length >= 5 || "Wpisz conajmniej 5 znaków",
					})}
				/>
			</FormRow>

			<FormRow label="Zdjęcie (opcjonalnie):">
				<FileInput id="imageUrl" accept="image/*" {...register("imageUrl")} />
			</FormRow>

			<FormRow>
				<Button
					type="reset"
					disabled={isCreating}
					onClick={() => onCloseModal?.()}
					$variation="danger">
					Anuluj
				</Button>
				<Button $variation="success" disabled={isCreating}>
					Dodaj
				</Button>
			</FormRow>
		</form>
	);
};

export default AddNewComment;
