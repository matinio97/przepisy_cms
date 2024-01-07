import { useQuery } from "@tanstack/react-query";
import { getAcceptedRecipes } from "../../services/apiRecipes";

export function useAcceptedRecipes() {
	const {
		isLoading,
		data: { data: recipes, count } = {},
		error,
	} = useQuery({
		queryKey: ["accepted-recipes"],
		queryFn: () => getAcceptedRecipes(),
	});

	return {
		isLoading,
		recipes,
		count,
		error,
	};
}
