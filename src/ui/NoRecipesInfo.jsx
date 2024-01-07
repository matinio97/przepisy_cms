import React from "react";
import styled from "styled-components";
import AddNewRecipeModal from "../features/recipes/AddNewRecipeModal";

const Box = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Text = styled.p`
	padding: 10px;
	font-size: 1.3rem;
	text-align: center;
	font-weight: 600;
`;

const NoRecipesInfo = () => {
	return (
		<Box>
			<Text>Nie dodałeś/aś jeszcze swoich przepisów!</Text>
			<Text>Kliknij w poniższy przycisk aby dodać nowy przepis!</Text>
			<AddNewRecipeModal />
		</Box>
	);
};

export default NoRecipesInfo;
