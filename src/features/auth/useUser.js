import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUserAuth";

export function useUser() {
	const {
		isLoading,
		data: user,
		fetchStatus,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});
	return {
		isLoading,
		user,
		isAuth: user?.role === "authenticated",
		fetchStatus,
	};
}
