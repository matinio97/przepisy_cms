import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRecipeStatus } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useChangeRecipeStatus() {
	const queryClient = useQueryClient();

	const { mutate: acceptRecipe, isLoading: isAccepting } = useMutation({
		mutationFn: ({ newRecipeData, id, target }) =>
			changeRecipeStatus(newRecipeData, id, target),
		onSuccess: () => {
			toast.success("Status przepisu został pomyślnie zmieniony");

			queryClient.invalidateQueries({
				queryKey: ["recipes"],
			});
			queryClient.resetQueries();
		},
		onError: () => toast.error("Wystąpił błąd podczas zmiany statusu przepisu"),
	});
	return { acceptRecipe, isAccepting };
}
