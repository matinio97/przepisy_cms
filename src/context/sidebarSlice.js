import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sidebarOption: "filterSorter",
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState: initialState,
	reducers: {
		changeSidebarOption(state, action) {
			state.sidebarOption = action.payload;
		},
	},
});

export const { changeSidebarOption } = sidebarSlice.actions;

export default sidebarSlice.reducer;
