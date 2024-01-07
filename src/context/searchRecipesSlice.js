import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchRecipe: "",
};

const searchRecipeSlice = createSlice({
	name: "searchRecipe",
	initialState: initialState,
	reducers: {
		searchRecipe(state, action) {
			state.searchRecipe = action.payload;
		},
	},
});

export const { searchRecipe } = searchRecipeSlice.actions;

export default searchRecipeSlice.reducer;
