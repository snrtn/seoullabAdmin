import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const storedAuth = localStorage.getItem('isAuthenticated');
		if (storedAuth) {
			setIsAuth(true);
		}
	}, []);

	const setAuthenticated = (authStatus) => {
		localStorage.setItem('isAuthenticated', authStatus);
		setIsAuth(authStatus);
	};

	const isAuthenticated = () => isAuth;

	return <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
