import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateIngredientStatus } from "../../services/apiRecipes";

export function useAcceptIngredient() {
	const queryClient = useQueryClient();

	const { mutate: acceptIngredient, isLoading: isAccepting } = useMutation({
		mutationFn: (id) => updateIngredientStatus(id),
		onSuccess: () => {
			toast.success("Składnik został zaakceptowany.");

			queryClient.invalidateQueries({
				queryKey: ["ingredients"],
			});
			queryClient.resetQueries();
		},
		onError: () =>
			toast.error("Wystąpił błąd podczas zmiany akceptacji tego składnika."),
	});
	return { acceptIngredient, isAccepting };
}
