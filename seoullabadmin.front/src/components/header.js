import React from 'react';
import { AppBar, Toolbar, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/auth/authSlice';

const Header = () => {
	const { isAuthenticated, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser())
			.then(() => {
				localStorage.removeItem('token');
				navigate('/');
			})
			.catch((error) => {
				console.error('Logout Error:', error);
			});
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Seoul Lab
				</Typography>
				{isAuthenticated && (
					<Button color='inherit' onClick={handleLogout}>
						{loading ? <CircularProgress color='inherit' size={24} /> : 'Logout'}
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
