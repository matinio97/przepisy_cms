import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiUserAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => navigate("/recipes", { replace: true }),
		onError: () => {
			toast.error("Wprowadzony login lub hasło są niepoprawne");
		},
	});
	return { login, isLoading };
}
