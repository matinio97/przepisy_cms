import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorageState } from "./useLocalStorageState";

export function usePreparePageParam(pageSizeKey, options) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [pageSize, setPageSize] = useLocalStorageState(
		options.at(0).value,
		pageSizeKey
	);

	useEffect(() => {
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	}, []);

	return [Number(pageSize), setPageSize];
}
