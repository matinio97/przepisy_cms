import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiAdminAuth";
import toast from "react-hot-toast";

export function useDeleteUser() {
	const queryClient = useQueryClient();
	const { isLoading: isDeletingUser, mutate: deleteUser } = useMutation({
		mutationFn: deleteUserApi,
		onSuccess: () => {
			toast.success("Użytkownik pomyślnie usunięty");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			// location.reload();
		},
		onError: () => toast.error("Wystąpił błąd podczas usuwania użytkownika"),
	});

	return { isDeletingUser, deleteUser };
}
