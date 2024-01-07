import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiUserAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: () => {
			toast.success("Nowe konto zarejestrowane pomyślnie");
		},
		onError: () =>
			toast.error("Wystąpił problem podczas rejestracji nowego konta"),
	});
	return { signup, isLoading };
}
