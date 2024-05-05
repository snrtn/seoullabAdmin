import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const Header = () => {
	const { isAuthenticated, setAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		setAuthenticated(false);
		navigate('/');
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Seoul Lab
				</Typography>
				{isAuthenticated && (
					<Button color='inherit' onClick={handleLogout}>
						Logout
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
