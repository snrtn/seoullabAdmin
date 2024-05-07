import { createSlice } from '@reduxjs/toolkit';
import { menuApi } from '../../services/menuApi';

export const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		menuItems: [],
		status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
		error: null,
	},
	reducers: {
		setMenuItems: (state, action) => {
			state.menuItems = action.payload;
		},
		addMenuItem: (state, action) => {
			state.menuItems.push(action.payload);
		},
		updateMenuItem: (state, action) => {
			const index = state.menuItems.findIndex((item) => item.id === action.payload.id);
			if (index !== -1) {
				state.menuItems[index] = action.payload;
			}
		},
		removeMenuItem: (state, action) => {
			state.menuItems = state.menuItems.filter((item) => item.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(menuApi.endpoints.getMenuItems.matchPending, (state) => {
				state.status = 'loading';
			})
			.addMatcher(menuApi.endpoints.getMenuItems.matchFulfilled, (state, action) => {
				state.status = 'succeeded';
				state.menuItems = action.payload;
			})
			.addMatcher(menuApi.endpoints.getMenuItems.matchRejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error ? action.error.message : null;
			});
	},
});

export const { setMenuItems, addMenuItem, updateMenuItem, removeMenuItem } = menuSlice.actions;

export default menuSlice.reducer;
