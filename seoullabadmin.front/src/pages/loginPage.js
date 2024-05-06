import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';
import { Container, Card, Typography, TextField, Button, CardContent, Box, CircularProgress } from '@mui/material';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/menu-registration');
		}
	}, [isAuthenticated, navigate]);

	const handleLogin = async (event) => {
		event.preventDefault();
		dispatch(loginUser({ username, password })).then((response) => {
			if (response.payload && response.payload.success) {
				localStorage.setItem('token', response.payload.token);
			} else {
				setErrorMessage(response.payload.message || 'An error occurred while logging in. Please try again later.');
			}
		});
	};

	return (
		<Container component='main' maxWidth='xs' sx={{ mt: 10 }}>
			<Card variant='outlined'>
				<CardContent>
					<Typography variant='h4' component='h1' gutterBottom>
						Admin Login
					</Typography>
					<Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							{loading ? <CircularProgress size={24} /> : 'Login'}
						</Button>
						{errorMessage && <Typography color='error'>{errorMessage}</Typography>}
						{error && !errorMessage && <Typography color='error'>{error}</Typography>}
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
