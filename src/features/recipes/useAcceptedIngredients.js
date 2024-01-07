import { useQuery } from "@tanstack/react-query";
import { getAcceptedIngredients } from "../../services/apiRecipes";

export function useAcceptedIngredients() {
	const {
		isLoading,
		data: { data: ingredients, count } = {},
		error,
	} = useQuery({
		queryKey: ["accepted-ingredients"],
		queryFn: () => getAcceptedIngredients(),
	});

	return {
		isLoading,
		ingredients,
		count,
		error,
	};
}
