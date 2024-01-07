import React from "react";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ButtonIcon from "../../ui/ButtonIcon";
import Tooltip from "../../ui/Tooltip";
import { format, parseISO } from "date-fns";
import styled, { css } from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowUpRightCircle } from "react-icons/bs";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteRecipe } from "./useDeleteRecipe";
import RecipeDetails from "./RecipeDetails";
import AdminRecipeOperation from "../../ui/AdminRecipeOperation";
import { TbStatusChange } from "react-icons/tb";

const variations = {
	accepted: css`
		color: var(--color-grey-50);
		background-color: var(--color-green-700);
	`,
	rejected: css`
		color: var(--color-grey-50);
		background-color: var(--color-red-700);
	`,
	verifying: css`
		color: var(--color-grey-50);
		background-color: var(--color-yellow-700);
	`,
};

const Status = styled.div`
	margin: auto;
	padding: 10px 20px;
	width: max-content;
	border-radius: 999px;
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => variations[props.status]}
`;

Status.defaultProps = {
	status: "verifying",
};

const ActionsBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
`;

const Image = styled.img`
	margin: auto;
	max-height: 4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
`;

const AdminRecipeCart = ({ recipe }) => {
	const { created_at, id, recipeName, recipeStatus, imageUrl } = recipe;
	const { isDeleting, deleteRecipe } = useDeleteRecipe();

	const tooltipStatusText =
		recipeStatus === "accepted"
			? "Przepis widoczny dla wszystkich użytkowników."
			: recipeStatus === "rejected"
			? "Odrzuciłeś/aś ten przepis."
			: "Nie zaakceptowałeś/aś jeszcze tego przepisu";

	return (
		<Table.Row>
			<Image src={imageUrl} />
			<p>{recipeName}</p>
			<p>{format(parseISO(created_at), "dd.MM.yyyy")}r.</p>
			<>
				{recipeStatus === "verifying" && (
					<Tooltip text={tooltipStatusText}>
						<Status>Weryfikacja</Status>
					</Tooltip>
				)}

				{recipeStatus === "accepted" && (
					<Tooltip text={tooltipStatusText}>
						<Status status="accepted">Publiczny</Status>
					</Tooltip>
				)}
				{recipeStatus === "rejected" && (
					<Tooltip text={tooltipStatusText}>
						<Status status="rejected">Odrzucony</Status>
					</Tooltip>
				)}
			</>
			<Modal>
				<ActionsBox>
					<Tooltip text="Podgląd przepisu">
						<Modal.Open opens="recipePreview">
							<ButtonIcon color="--color-green-700">
								<BsArrowUpRightCircle />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>

					<Tooltip text="Zmień status przepisu">
						<Modal.Open opens="changeRecipeStatus">
							<ButtonIcon color="--color-blue-700">
								<TbStatusChange />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>

					<Tooltip text="Usuń przepis">
						<Modal.Open opens="delete">
							<ButtonIcon color="--color-red-700">
								<AiOutlineDelete />
							</ButtonIcon>
						</Modal.Open>
					</Tooltip>
				</ActionsBox>

				<Modal.Window name="recipePreview">
					<RecipeDetails isModal={true} recipe={recipe} />
				</Modal.Window>

				<Modal.Window name="changeRecipeStatus">
					<AdminRecipeOperation
						recipe={recipe}
						id={id}
						recipeStatus={recipeStatus}
					/>
				</Modal.Window>

				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName={` przepis '${recipeName}'`}
						disabled={isDeleting}
						onConfirm={() => {
							deleteRecipe(id);
						}}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
};

export default AdminRecipeCart;
