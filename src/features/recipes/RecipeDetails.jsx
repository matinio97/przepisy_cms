import Spinner from "../../ui/Spinner";
import { format, parseISO } from "date-fns";
import styled, { css } from "styled-components";
import Heading from "../../ui/Heading";
import { useUserById } from "../auth/useUserById";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSidebarOption } from "../../context/sidebarSlice";
import { useRecipeComments } from "../comments/useRecipeComments";
import CommentsPanel from "../comments/CommentsPanel";
import { getIngredientById } from "../../services/apiRecipes";

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.8rem;
	gap: 1.2rem;
	@media (min-width: 1024px) {
		padding: ${(props) => (props.$isModal ? "0.8rem 1.2rem" : "0.8rem 10vw")};
	}
	@media (min-width: 1440px) {
		padding: ${(props) => (props.$isModal ? "0.8rem 4rem" : "0.8rem 20vw")};
	}
	margin-bottom: 3rem;
`;

const Row = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	gap: 0.8rem;
	flex-wrap: wrap;
	@media (min-width: 768px) {
		justify-content: space-evenly;
	}
`;

const Img = styled.img`
	width: 100%;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	border: 1px solid var(--color-grey-700);
	border-radius: var(--border-radius-lg);
	@media (min-width: 768px) {
		width: 75%;
	}
	@media (min-width: 1440px) {
		width: 100%;
	}
`;

const P = styled.p`
	font-size: ${(props) => (props.size ? props.size : css`1rem`)};
	text-align: justify;
	/* word-break: break-all; */
`;

const Li = styled.li`
	list-style-type: circle;
`;

const RecipeDetails = ({
	recipe,
	isModal = false,
	showComments = false,
	isLogged = false,
}) => {
	if (!recipe)
		throw new Error("Próbujesz dostać się do strony, która nie istnieje.");

	const dispatch = useDispatch();
	useEffect(() => {
		!isModal && dispatch(changeSidebarOption("backButton"));
	});

	const {
		id,
		created_at,
		recipeName,
		timeToPrepare,
		ingredients,
		methodOfPreparing,
		imageUrl,
		servingsNumber,
		author,
		description,
	} = recipe;

	const { isLoading, user } = useUserById(author);

	const [ingredientsName, setIngredientsName] = useState([]);

	useEffect(() => {
		const getIngredientName = async (id) => {
			const ingredient = await getIngredientById(id);
			return ingredient;
		};

		const fetchData = async () => {
			const ingredientsName = await Promise.all(
				JSON.parse(ingredients).map(async ({ id }) => {
					const name = await getIngredientName(id);
					return name;
				})
			);

			setIngredientsName(ingredientsName);
		};

		if (!isLoading) fetchData();
	}, [ingredients, isLoading]);

	if (isLoading) return <Spinner />;

	const authorName = user.user.user_metadata.userName;
	const devidedIngredients = JSON.parse(ingredients);

	return (
		<Layout $isModal={isModal}>
			<Img src={imageUrl} />
			<Heading as="h4">{recipeName}</Heading>
			<Heading as="h5">Czas przygotowania: {timeToPrepare} min</Heading>

			<Row>
				<span>Autor: {authorName}</span>
				<span>{format(parseISO(created_at), "dd.MM.yyyy")}r</span>
			</Row>

			<Heading as="h5">Liczba porcji: {servingsNumber}</Heading>

			{description && (
				<>
					<Heading as="h4">Opis dania</Heading>
					<P>{description}</P>
				</>
			)}

			<Heading as="h4">Składniki</Heading>
			<ul>
				{devidedIngredients.map((element, index) => (
					<Li key={index}>
						{ingredientsName[index]} - {element.quantity}
					</Li>
				))}
			</ul>

			<Heading as="h4" style={{ textAlign: "center" }}>
				Sposób przygotowania
			</Heading>
			<P>{methodOfPreparing}</P>
			{showComments && (
				<>
					<Heading as="h4" style={{ textAlign: "center" }}>
						Komentarze
					</Heading>
					<CommentsPanel
						recipeId={id}
						recipeName={recipeName}
						isLogged={isLogged}
					/>
				</>
			)}
		</Layout>
	);
};

export default RecipeDetails;
