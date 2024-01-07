import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useChangeRecipeStatus } from "../features/recipes/useChangeRecipeStatus";

const StyledWindow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 1rem;

	justify-content: space-between;

	& p {
		color: var(--color-grey-500);
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
`;

function AdminRecipeOperation({ recipe, id, recipeStatus, onCloseModal }) {
	const { acceptRecipe, isAccepting } = useChangeRecipeStatus();

	const handleClick = (status) => {
		acceptRecipe({
			recipe: { ...recipe, recipeStatus: status },
			id,
			target: status,
		});
		onCloseModal();
	};

	return (
		<StyledWindow>
			<Heading as="h3">Zmień status przepisu</Heading>
			{(recipeStatus === "rejected" || recipeStatus === "verifying") && (
				<p>
					<b style={{ color: "var(--color-green-700)" }}>Zaakceptuj </b>
					przepis <b>{recipe.recipeName}</b>, aby stał się widoczny dla
					wszystkich użytkowników.
				</p>
			)}
			{(recipeStatus === "accepted" || recipeStatus === "verifying") && (
				<p>
					<b style={{ color: "var(--color-red-700)" }}>Odrzuć </b>
					przepis <b>{recipe.recipeName}</b> jeżeli uważasz, że nie jest on
					stosowny lub potrzebuje poprawki.
				</p>
			)}
			<b>Operację można potem zmienić.</b>
			<div>
				<Button onClick={onCloseModal}>Anuluj</Button>
				{(recipeStatus === "rejected" || recipeStatus === "verifying") && (
					<Button
						$variation="success"
						disabled={isAccepting}
						onClick={() => handleClick(true)}>
						Akceptuj
					</Button>
				)}
				{(recipeStatus === "accepted" || recipeStatus === "verifying") && (
					<Button
						disabled={isAccepting}
						$variation="danger"
						onClick={() => handleClick(false)}>
						Odrzuć
					</Button>
				)}
			</div>
		</StyledWindow>
	);
}

export default AdminRecipeOperation;
