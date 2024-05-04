import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authContext';
import { Container, Card, Typography, TextField, Button, CardContent, Box } from '@mui/material';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setAuthenticated } = useAuth();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/login', {
				username,
				password,
			});

			if (response.data.success) {
				setAuthenticated(true); // This will also update local storage due to the useEffect in AuthProvider
				navigate('/menu-registration');
			} else {
				alert('Login failed: ' + response.data.message);
			}
		} catch (error) {
			console.error('Login request failed:', error);
			alert('An error occurred during login.');
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Card variant='outlined'>
				<CardContent>
					<Typography variant='h4' component='h1' gutterBottom>
						Admin
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
							Login
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
