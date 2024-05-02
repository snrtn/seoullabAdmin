import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { AuthProvider } from './components/authContext';
import ProtectedRoute from './components/protectedRoute';

import LoginPage from './pages/loginPage';
import MenuRegistrationPage from './pages/registrationPage';
import DataTablePage from './pages/dataTablePage';
import NotFoundPage from './pages/notFoundPage';

const Layout = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
}));

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route
							path='/menu-registration'
							element={
								<ProtectedRoute>
									<MenuRegistrationPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/data-table'
							element={
								<ProtectedRoute>
									<DataTablePage />
								</ProtectedRoute>
							}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</Router>
	);
};

export default App;
