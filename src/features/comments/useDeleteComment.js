import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useDeleteComment() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteComment } = useMutation({
		mutationFn: deleteCommentApi,
		onSuccess: () => {
			toast.success("Komentarz pomyślnie usunięty");
			queryClient.invalidateQueries([
				{
					queryKey: ["comments"],
				},
			]);
		},
		onError: () => toast.error("Wystąpił błąd podczas usuwania komentarzu"),
	});
	return { isDeleting, deleteComment };
}
