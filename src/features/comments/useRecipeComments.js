import { useQuery } from "@tanstack/react-query";
import { getRecipeComments } from "../../services/apiRecipes";

export function useRecipeComments(recipeId) {
	const {
		isLoading,
		data: { comments, count } = {},
		error,
	} = useQuery({
		queryKey: ["comments"],
		queryFn: () => getRecipeComments(recipeId),
	});

	return { isLoading, error, comments, count };
}
