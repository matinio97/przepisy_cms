import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "../../services/apiRecipes";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function useRecipes(pageSize, isPublic, loadRecipesBySearch) {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	//search by recipe
	const searchRecipeQuery = loadRecipesBySearch
		? useSelector((store) => store.searchRecipe.searchRecipe)
		: "";

	//sortBy
	const sortBy = searchParams.get("sortBy") || "latest";

	//filter
	const filterStatusValue = isPublic
		? "accepted"
		: searchParams.get("recipeStatus");
	const filterStatus =
		!filterStatusValue || filterStatusValue === "all"
			? null
			: { field: "recipeStatus", value: filterStatusValue, method: "eq" };

	const filterTypeValue = isPublic && searchParams.get("filter");

	const filterType =
		!filterTypeValue || filterTypeValue === "all"
			? null
			: { field: "type", value: filterTypeValue, method: "eq" };

	const filters = [filterStatus, filterType];

	//pagination
	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

	const {
		isLoading,
		data: { data: recipes, count } = {},
		error,
	} = useQuery({
		queryKey: ["recipes", filters, sortBy, page, pageSize, searchRecipeQuery],
		queryFn: () =>
			getRecipes({
				filters,
				sortBy,
				page,
				pageSize,
				recipeQuery: searchRecipeQuery.trim(),
			}),
	});

	// const pageCount = Math.ceil(count / pageSize, searchRecipeQuery);
	// if (page < pageCount)
	// 	queryClient.prefetchQuery({
	// 		queryKey: ["recipes", filters, sortBy, page + 1, pageSize],
	// 		queryFn: () =>
	// 			getRecipes({
	// 				filters,
	// 				sortBy,
	// 				page: page + 1,
	// 				pageSize,
	// 			}),
	// 	});

	// if (page > 0)
	// 	queryClient.prefetchQuery({
	// 		queryKey: ["recipes", filters, sortBy, page - 1, pageSize],
	// 		queryFn: () =>
	// 			getRecipes({
	// 				filters,
	// 				sortBy,
	// 				page: page - 1,
	// 				pageSize,
	// 			}),
	// 	});

	return { isLoading, error, recipes, count };
}
