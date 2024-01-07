import React from "react";
import Heading from "./Heading";

const NoRecipeFound = () => {
	return (
		<Heading as="h4" style={{ marginTop: "20%", textAlign: "center" }}>
			Niestety nie znaleźliśmy przepisów dopasowanych do twoich filtrów 😢{" "}
			<br />
			Spróbuj ponownie później.
		</Heading>
	);
};

export default NoRecipeFound;
