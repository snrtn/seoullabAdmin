import { styled } from '@mui/material/styles';
import { Box, Card, Grid, TextField, Button, Typography } from '@mui/material';

export const LoginPageContainer = styled(Grid)({
	minHeight: '90vh', // Full viewport height
});

export const StyledCard = styled(Card)(({ theme }) => ({
	maxWidth: '450px',
	margin: 'auto',
	padding: theme.spacing(4),
	boxShadow: 'none',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
}));

export const Container = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '90vh',
});

export const StyledBox = styled(Box)(({ theme }) => ({
	maxWidth: '450px',
	margin: 'auto',
	padding: theme.spacing(4),
}));

export const StyledTextField = styled(TextField)({
	margin: '8px 0',
});

export const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: '16px',
	padding: '10px 0',
	backgroundColor: theme.palette.primary.main,
	color: '#FFFFFF',
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
	marginBottom: '20px',
	fontWeight: theme.typography.h1.fontWeight,
	fontFamily: theme.typography.fontFamily,
}));
