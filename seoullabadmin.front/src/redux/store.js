import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import menuReducer from './menu/menuSlice';
import { menuApi } from '../services/menuApi';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		menu: menuReducer,
		[menuApi.reducerPath]: menuApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuApi.middleware),
});
