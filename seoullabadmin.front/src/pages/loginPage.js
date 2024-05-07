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
	const { isAuthenticated, loading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/menu-registration');
		}
	}, [isAuthenticated, navigate]);

	const handleLogin = async (event) => {
		event.preventDefault();
		dispatch(loginUser({ username, password }))
			.unwrap()
			.then((response) => {
				localStorage.setItem('token', response.token);
				navigate('/menu-registration');
			})
			.catch((error) => {
				// Ensure that only the message part of the error object is displayed
				setErrorMessage(error.message || 'Login failed. Check your credentials.');
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
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
