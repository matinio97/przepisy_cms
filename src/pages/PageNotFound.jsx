import React from "react";
import ErrorFallback from "../ui/ErrorFallback";

const PageNotFound = () => {
	return (
		<ErrorFallback
			error={{ message: "Próbujesz dostać się do strony, która nie istnieje." }}
			resetErrorBoundary={() => window.location.replace("/recipes")}
		/>
	);
};

export default PageNotFound;
