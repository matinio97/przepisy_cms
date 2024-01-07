import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserRole as updateUserRoleApi } from "../../services/apiAdminAuth";

export function useUpdateUserRole() {
	const queryClient = useQueryClient();

	const { mutate: updateUserRole, isLoading: isUpdating } = useMutation({
		mutationFn: ({ id, newRole }) => updateUserRoleApi(id, newRole),
		onSuccess: () => {
			toast.success("Zmieniono uprawnienia użytkownika");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
		onError: () =>
			toast.error("Wystąpił błąd podczas zmiany uprawnień użytkownika"),
	});
	return { updateUserRole, isUpdating };
}
