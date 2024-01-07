import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showDashboard: false,
};

const dashboard = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {
		changeShowDashboard(state, action) {
			state.showDashboard = action.payload;
		},
	},
});

export const { changeShowDashboard } = dashboard.actions;

export default dashboard.reducer;
