import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiAdminAuth";

export function useUserById(id) {
	const { isLoading, data: user } = useQuery({
		queryKey: ["user-by-id"],
		queryFn: () => getUserById(id),
	});
	return {
		isLoading,
		user,
	};
}
