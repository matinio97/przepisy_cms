import { useQuery } from "@tanstack/react-query";
import { getUserRecipes } from "../../services/apiRecipes";
import { useSearchParams } from "react-router-dom";

export function useUserRecipes(user, pageSize) {
	const [searchParams] = useSearchParams();

	//page
	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

	const {
		isLoading,
		data: { data: recipes, count } = {},
		error,
	} = useQuery({
		queryKey: ["user-recipes", user, page, pageSize],
		queryFn: () => getUserRecipes({ user, page, pageSize }),
		// retry: false,
	});
	return { isLoading, error, recipes, count };
}
