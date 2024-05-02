import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authContext';
import { StyledTextField, StyledButton, StyledTypography, LoginPageContainer, StyledCard } from './loginPage.styles';

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
				setAuthenticated(true);
				localStorage.setItem('authenticated', 'true');
				navigate('/menu-registration');
			} else {
				alert('로그인 실패: ' + response.data.message);
			}
		} catch (error) {
			console.error('로그인 요청 실패:', error);
			alert('로그인 요청 중 에러가 발생했습니다.');
		}
	};

	return (
		<LoginPageContainer container>
			<StyledCard>
				<StyledTypography variant='h4'>Admin Login</StyledTypography>
				<form onSubmit={handleLogin}>
					<StyledTextField
						label='Username'
						variant='outlined'
						fullWidth
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<StyledTextField
						label='Password'
						type='password'
						variant='outlined'
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<StyledButton type='submit' variant='contained' fullWidth>
						Login
					</StyledButton>
				</form>
			</StyledCard>
		</LoginPageContainer>
	);
};

export default LoginPage;
