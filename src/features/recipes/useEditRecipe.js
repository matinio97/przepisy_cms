import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateRecipe } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useEditRecipe() {
	const queryClient = useQueryClient();

	const { mutate: editRecipe, isLoading: isEditing } = useMutation({
		mutationFn: ({ newRecipeData, id }) =>
			createUpdateRecipe(newRecipeData, id),
		onSuccess: () => {
			toast.success(
				"Przepis pomyślnie edytowany. Czeka na potwierdzenie przez administratora"
			);
			queryClient.invalidateQueries({
				queryKey: ["user-recipes"],
			});
		},
		onError: () => toast.error("Wystąpił błąd podczas edytowania przepisu"),
	});
	return { editRecipe, isEditing };
}
