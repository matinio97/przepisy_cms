import { useQuery } from "@tanstack/react-query";
import { getVerificationRecipes } from "../../services/apiRecipes";

export function useVerificationRecipes() {
	const {
		isLoading,
		data: { data: recipes, count } = {},
		error,
	} = useQuery({
		queryKey: ["verify-recipes"],
		queryFn: () => getVerificationRecipes(),
	});

	return {
		isLoading,
		recipes,
		count,
		error,
	};
}
