import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
	try {
		const response = await axios.post('http://localhost:3000/login', userData);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');
		await axios.post('http://localhost:3000/logout', { token });
		return;
	} catch (error) {
		return rejectWithValue('Logout failed');
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: !!localStorage.getItem('token'),
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = action.payload || 'Login failed';
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Logout failed';
			});
	},
});

export default authSlice.reducer;
