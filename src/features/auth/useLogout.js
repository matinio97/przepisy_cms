import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiUserAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			toast.success("Pomyślnie wylogowano");
			queryClient.removeQueries();
			navigate("/recipes", { replace: true });
		},
	});

	return { logout, isLoading };
}
