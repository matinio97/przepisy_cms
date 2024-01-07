import { useQuery } from "@tanstack/react-query";
import { getVerificationIngredients } from "../../services/apiRecipes";

export function useVerificationIngredients() {
	const {
		isLoading,
		data: { data: ingredients, count } = {},
		error,
	} = useQuery({
		queryKey: ["verify-ingredients"],
		queryFn: () => getVerificationIngredients(),
	});

	return {
		isLoading,
		ingredients,
		count,
		error,
	};
}
