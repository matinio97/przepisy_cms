import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const Card = styled.div`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	border: 2px solid var(--color-yellow-700);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-200);
	flex: 1 1 250px;
	max-width: 300px;
	@media (min-width: 768px) {
		max-width: calc(50% - 1rem);
	}
	@media (min-width: 1024px) {
		max-width: 300px;
	}
	&:hover {
		cursor: pointer;
		background-color: var(--color-indigo-100);
	}
	transition: all 0.3s;
`;

const Img = styled.img`
	object-fit: cover;
	filter: grayscale(--image-grayscale);
	opacity: var(--image-opacity);
	transition: all 0.3s;
	aspect-ratio: 3 / 2;
	border-bottom: 2px solid var(--color-yellow-700);
`;

const Box = styled.div`
	height: 100%;
	display: flex;
	padding: 20px;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

const RecipeCard = ({ recipe }) => {
	const { id: recipeId, imageUrl, recipeName, timeToPrepare } = recipe;
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/recipe/${recipeId}`);
	}

	return (
		<Card onClick={handleClick}>
			<Img src={imageUrl} alt={`Zdjęcie ${recipeName}`} />
			<Box>
				<Heading as="h5">{recipeName}</Heading>
				<Heading as="h5" style={{ minWidth: "max-content" }}>
					{timeToPrepare} min
				</Heading>
			</Box>
		</Card>
	);
};

export default RecipeCard;
