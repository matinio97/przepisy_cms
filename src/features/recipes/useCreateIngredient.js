import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngredient as createIngredientApi } from "../../services/apiRecipes";

export function useCreateIngredient() {
	const queryClient = useQueryClient();

	const { mutate: createIngredient, isLoading: isCreating } = useMutation({
		mutationFn: (name) => createIngredientApi(name),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["ingredients"],
			});
		},
		onError: () => toast.error("Wystąpił błąd przy dodawaniu składnika"),
	});

	return { createIngredient, isCreating };
}
