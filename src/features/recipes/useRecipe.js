import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../../services/apiRecipes";
import { useParams } from "react-router-dom";

export function useRecipe() {
	const { recipeId } = useParams();

	const {
		isLoading,
		data: recipe,
		error,
	} = useQuery({
		queryKey: ["recipe", recipeId],
		queryFn: () => getRecipe(recipeId),
		retry: false,
	});

	return { isLoading, error, recipe };
}
