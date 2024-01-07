import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteIngredient as deleteIngredientApi } from "../../services/apiRecipes";

export function useDeleteIngredient() {
	const queryClient = useQueryClient();

	const { mutate: deleteIngredient, isLoading: isDeleting } = useMutation({
		mutationFn: (id) => deleteIngredientApi(id),
		onSuccess: () => {
			toast.error("Składnik został usunięty.");

			queryClient.invalidateQueries({
				queryKey: ["ingredients"],
			});
			// queryClient.resetQueries();
		},
		onError: () =>
			toast.error("Wystąpił błąd podczas zmiany usuwania tego składnika."),
	});
	return { deleteIngredient, isDeleting };
}
