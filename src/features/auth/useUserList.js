import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../services/apiAdminAuth";
import { useSearchParams } from "react-router-dom";

export function useUserList(pageSize) {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

	const { isLoading, data } = useQuery({
		queryKey: ["users", page, pageSize],
		queryFn: () => getUserList({ page, pageSize }),
	});

	const users = data?.users || [];
	const count = data?.total || 0;

	return {
		isLoading,
		users,
		count,
	};
}
