import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => {
		const storedToken = localStorage.getItem('token');
		return storedToken || '';
	});

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (!storedToken) {
			setToken('');
		}
	}, []);

	const setAuthenticated = (newToken) => {
		if (newToken && newToken !== '' && newToken !== undefined && newToken !== null) {
			localStorage.setItem('token', newToken);
			setToken(newToken);
		} else {
			localStorage.removeItem('token');
			setToken('');
		}
	};

	const isAuthenticated = () => !!token;

	return <AuthContext.Provider value={{ isAuthenticated, token, setAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
