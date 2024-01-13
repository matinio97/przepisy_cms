import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe as deleteRecipeApi } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useDeleteRecipe() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteRecipe } = useMutation({
		mutationFn: deleteRecipeApi,
		onSuccess: () => {
			toast.success("Przepis pomyślnie usunięty");
			queryClient.invalidateQueries([
				{
					queryKey: ["user-recipes"],
				},
				{ queryKey: ["recipes"] },
			]);
		},
		onError: () => toast.error("Wystąpił błąd podczas usuwania przepisu"),
	});
	return { isDeleting, deleteRecipe };
}
