import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchIngredient: "",
};

const searchIngredientSlice = createSlice({
	name: "searchIngredient",
	initialState: initialState,
	reducers: {
		searchIngredient(state, action) {
			state.searchIngredient = action.payload;
		},
	},
});

export const { searchIngredient } = searchIngredientSlice.actions;

export default searchIngredientSlice.reducer;
