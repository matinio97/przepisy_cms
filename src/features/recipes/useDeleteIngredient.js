import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteIngredient as deleteIngredientApi } from "../../services/apiRecipes";

export function useDeleteIngredient() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteIngredient } = useMutation({
		mutationFn: deleteIngredientApi,
		onSuccess: () => {
			toast.error("Składnik został usunięty.");

			queryClient.invalidateQueries({
				queryKey: ["ingredients"],
			});
		},
		onError: () =>
			toast.error("Wystąpił błąd podczas zmiany usuwania tego składnika."),
	});
	return { deleteIngredient, isDeleting };
}
