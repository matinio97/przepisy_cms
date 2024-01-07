import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateRecipe } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useCreateRecipe() {
	const queryClient = useQueryClient();

	const { mutate: createRecipe, isLoading: isCreating } = useMutation({
		mutationFn: createUpdateRecipe,
		onSuccess: () => {
			toast.success(
				"Nowy przepis został dodany, oczekuje na weryfikację administratora."
			);
			queryClient.invalidateQueries({
				queryKey: ["user-recipes"],
			});
		},
		onError: () => toast.error("Wystąpił błąd przy dodawaniu przepisu"),
	});

	return { isCreating, createRecipe };
}
