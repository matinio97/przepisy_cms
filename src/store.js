import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./context/sidebarSlice";
import searchRecipesReducer from "./context/searchRecipesSlice";
import searchIngredientReducer from "./context/searchIngredientSlice";
import dashboardReducer from "./context/dashboardSlice";

const store = configureStore({
	reducer: {
		sidebar: sidebarReducer,
		searchRecipe: searchRecipesReducer,
		searchIngredient: searchIngredientReducer,
		dashboard: dashboardReducer,
	},
});

export default store;
