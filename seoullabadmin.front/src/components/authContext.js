import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(() => {
		// Check local storage for auth status
		return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
	});

	// Update local storage when isAuthenticated changes
	useEffect(() => {
		localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
	}, [isAuthenticated]);

	return <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
