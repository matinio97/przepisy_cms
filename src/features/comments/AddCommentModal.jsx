import React from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddNewComment from "./AddNewComment";

const AddCommentModal = ({ recipeName, authorId, recipeId }) => {
	return (
		<Modal>
			<Modal.Open opens="add-comment">
				<Button $variation="secondary">Dodaj komentarz</Button>
			</Modal.Open>
			<Modal.Window name="add-comment" outsideClickClose={false}>
				<AddNewComment
					recipeName={recipeName}
					authorId={authorId}
					recipeId={recipeId}
				/>
			</Modal.Window>
		</Modal>
	);
};

export default AddCommentModal;
