import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import AddRecipeForm from "./AddRecipeForm";

const AddNewRecipeModal = () => {
	return (
		<Modal>
			<Modal.Open opens="new-recipe-form">
				<Button $variation="secondary">Dodaj nowy przepis</Button>
			</Modal.Open>
			<Modal.Window name="new-recipe-form" outsideClickClose={false}>
				<AddRecipeForm />
			</Modal.Window>
		</Modal>
	);
};

export default AddNewRecipeModal;
