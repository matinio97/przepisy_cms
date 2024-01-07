import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiUserAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success("Dane zostały zaktualizowane");
			queryClient.setQueryData(["user"], user);
		},
		onError: () => toast.error("Wystąpił błąd podczas aktualizacji danych"),
	});
	return { updateUser, isUpdating };
}
