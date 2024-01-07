import { useQuery } from "@tanstack/react-query";
import { getIngredients } from "../../services/apiRecipes";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export function useIngredients(pageSize, loadIngredientsBySearch) {
	const [searchParams] = useSearchParams();

	//search by query
	const searchIngredientQuery = loadIngredientsBySearch
		? useSelector((store) => store.searchIngredient.searchIngredient)
		: "";

	//filter
	const filterValue = searchParams.get("isAccepted") || true;
	const filter =
		!filterValue || filterValue === true
			? {
					field: "isAccepted",
					value: true,
					method: "eq",
			  }
			: {
					field: "isAccepted",
					value: filterValue,
					method: "eq",
			  };

	//pagination
	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

	const {
		isLoading,
		data: { data: ingredients, count } = {},
		error,
	} = useQuery({
		queryKey: ["ingredients", filter, page, pageSize, searchIngredientQuery],
		queryFn: () =>
			getIngredients({
				filter,
				page,
				pageSize,
				ingredientQuery: searchIngredientQuery.trim(),
			}),
	});

	return {
		isLoading,
		ingredients,
		count,
		error,
	};
}
