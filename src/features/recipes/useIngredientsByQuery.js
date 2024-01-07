import { useQuery } from "@tanstack/react-query";
import { getIngredientsByQuery } from "../../services/apiRecipes";

export function useIngredientsByQuery(query) {
	const {
		isLoading,
		data: searchedIngredients,
		error,
	} = useQuery({
		queryKey: ["ingredients"],
		queryFn: () => getIngredientsByQuery(query),
	});

	return { isLoading, searchedIngredients, error };
}
