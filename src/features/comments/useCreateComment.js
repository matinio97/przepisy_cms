import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useCreateComment() {
	const queryClient = useQueryClient();

	const { mutate: createComment, isLoading: isCreating } = useMutation({
		mutationFn: createCommentApi,
		onSuccess: () => {
			toast.success("Twój komentarz został dodany :)");
			queryClient.invalidateQueries({
				queryKey: ["comments"],
			});
		},
		onError: () => toast.error("Wystąpił błąd podczas dodawania komentarza"),
	});

	return { isCreating, createComment };
}
