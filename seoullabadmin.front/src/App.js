import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { AuthProvider } from './components/authContext';
import ProtectedRoute from './components/protectedRoute';
import Header from './components/header';
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
				<Header />
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

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [error, setError] = useState(''); // 오류 메시지를 저장하는 상태

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		setError(''); // 기존 오류 메시지 초기화

// 		try {
// 			const response = await axios.post('http://localhost:3000/login', {
// 				username,
// 				password,
// 			});
// 			console.log('Registration successful', response.data);
// 			// 성공적인 처리 로직 (예: 로그인 페이지로 리다이렉트)
// 		} catch (error) {
// 			if (error.response && error.response.status === 409) {
// 				// 서버가 409 상태 코드로 응답한 경우
// 				setError('Username already exists. Please choose another one.');
// 			} else {
// 				// 기타 모든 오류 처리
// 				setError('An error occurred. Please try again later.');
// 			}
// 		}
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<label>
// 					Username:
// 					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
// 				</label>
// 				<label>
// 					Password:
// 					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
// 				</label>
// 				<button type='submit'>Register</button>
// 			</form>
// 			{error && <p>{error}</p>} {/* 오류 메시지 표시 */}
// 		</div>
// 	);
// }

// export default App;
