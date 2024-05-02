// registrationPage.styles.js
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, FormControl, Typography } from '@mui/material';

export const RegistrationContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '90vh',
});

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
	margin: theme.spacing(2, 0),
	width: '100%', // Use full width of the container
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
	margin: theme.spacing(2, 0),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
}));

export const ErrorMessage = styled(Typography)({
	color: 'red',
	marginTop: '8px',
});
