import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserByAdmin } from "../../services/apiAdminAuth";

export function useUpdateUserByAdmin() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateUserByAdmin,
		onSuccess: () => {
			toast.success("Dane zostały zaktualizowane");
			// queryClient.setQueryData(["users"]);
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
		onError: () => toast.error("Wystąpił błąd podczas aktualizacji danych"),
	});
	return { updateUser, isUpdating };
}
