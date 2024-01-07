import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";
import RecipeDetails from "../features/recipes/RecipeDetails";
import { useRecipe } from "../features/recipes/useRecipe";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";

const LoadedRecipe = () => {
	const { recipeId } = useParams();
	const { isLoading, recipe } = useRecipe(recipeId);
	const { isLoading: isLoadingUser, isAuth, fetchStatus } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isLoadingUser && recipe?.recipeStatus !== "accepted") {
			navigate("/recipes");
		}
	}, [isLoading, isLoadingUser, recipe]);

	if (isLoading || isLoadingUser) return <Spinner />;

	const isLogged = !isLoadingUser && isAuth && fetchStatus !== "fetching";

	return (
		<RecipeDetails recipe={recipe} showComments={true} isLogged={isLogged} />
	);
};

export default LoadedRecipe;
