import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MenuRegistrationPage = () => {
	const [view, setView] = useState('initial');
	const [menuData, setMenuData] = useState({
		primaryCategory: '',
		secondaryCategory: 'none',
		name: '',
		description: '',
		price: '',
	});
	const [errors, setErrors] = useState({});

	const foodOptions = {
		starters: 'Entrées',
		mains: 'Plats',
		desserts: 'Desserts',
	};
	const foodTypeOptions = {
		none: 'None',
		vegetarian: 'Vegetarian',
		eveningMenu: 'Evening Menu',
	};
	const drinkOptions = {
		none: 'None',
		redWine: 'Vin Rouge',
		whiteWine: 'Vin Blanc',
		roseWine: 'Vin Rosé',
		champagne: 'Champagne',
		beer: 'Bière',
		tea: 'Thé',
		coffee: 'Café',
		juice: 'Jus',
		softDrink: 'Boisson Gazeuse',
	};

	useEffect(() => {
		setMenuData((prev) => ({
			...prev,
			primaryCategory: view === 'drink' ? 'drinks' : '',
			secondaryCategory: 'none',
			name: '',
			description: '',
			price: '',
		}));
		setErrors({});
	}, [view]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMenuData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: '' }));
	};

	const resetForm = () => {
		setMenuData({
			primaryCategory: '',
			secondaryCategory: 'none',
			name: '',
			description: '',
			price: '',
		});
		setView('initial'); // Reset the view to initial
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let validationErrors = {};
		if (!menuData.primaryCategory) {
			validationErrors.primaryCategory = 'Please select a category.';
		}

		if (view === 'drink' && menuData.secondaryCategory === 'none') {
			validationErrors.secondaryCategory = 'Please select a valid drink type.';
		}
		if (!menuData.name) validationErrors.name = 'Name is required.';
		if (!menuData.description) validationErrors.description = 'Description is required.';
		if (!menuData.price) validationErrors.price = 'Price is required.';

		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		console.log('Submitting data:', menuData); // Log data being submitted
		try {
			const response = await axios.post(`http://localhost:3000/seoullab`, menuData);
			if (response.data.success) {
				alert('Menu registration successful!');
				resetForm();
			} else {
				alert('Registration failed: ' + response.data.message);
			}
		} catch (error) {
			console.error('Registration request failed:', error);
			alert('Server error occurred');
		}
	};

	const renderFoodForm = () => (
		<Box component='form' p={10} noValidate onSubmit={handleSubmit}>
			<FormControl fullWidth margin='normal'>
				<InputLabel id='primary-category-label'>Category</InputLabel>
				<Select
					labelId='primary-category-label'
					name='primaryCategory'
					value={menuData.primaryCategory}
					onChange={handleChange}
				>
					{Object.entries(foodOptions).map(([key, value]) => (
						<MenuItem key={key} value={key}>
							{value}
						</MenuItem>
					))}
				</Select>
				{errors.primaryCategory && <Typography color='error'>{errors.primaryCategory}</Typography>}
			</FormControl>
			<FormControl fullWidth margin='normal'>
				<InputLabel id='secondary-category-label'>Food Type</InputLabel>
				<Select
					labelId='secondary-category-label'
					name='secondaryCategory'
					value={menuData.secondaryCategory}
					onChange={handleChange}
				>
					{Object.entries(foodTypeOptions).map(([key, value]) => (
						<MenuItem key={key} value={key}>
							{value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				fullWidth
				label='Name'
				name='name'
				value={menuData.name}
				onChange={handleChange}
				error={!!errors.name}
				helperText={errors.name}
				margin='normal'
			/>
			<TextField
				fullWidth
				label='Description'
				name='description'
				value={menuData.description}
				onChange={handleChange}
				error={!!errors.description}
				helperText={errors.description}
				margin='normal'
			/>
			<TextField
				fullWidth
				label='Price'
				name='price'
				type='number'
				value={menuData.price}
				onChange={handleChange}
				error={!!errors.price}
				helperText={errors.price}
				margin='normal'
			/>
			<Box margin={'normal'} sx={{ mt: 2 }}>
				<Button type='submit' variant='contained'>
					Register Food
				</Button>
			</Box>
			<Box margin={'normal'} sx={{ mt: 2 }}>
				<Button onClick={() => setView('initial')} variant='contained' color='error'>
					Back
				</Button>
			</Box>
		</Box>
	);

	const renderDrinkForm = () => (
		<Box component='form' p={10} noValidate onSubmit={handleSubmit}>
			<FormControl fullWidth margin='normal'>
				<TextField InputProps={{ readOnly: true }} label='Category' value='Boissons' variant='filled' />
			</FormControl>
			<FormControl fullWidth margin='normal'>
				<InputLabel id='secondary-category-label'>Drink Type</InputLabel>
				<Select
					labelId='secondary-category-label'
					name='secondaryCategory'
					value={menuData.secondaryCategory}
					onChange={handleChange}
				>
					{Object.entries(drinkOptions).map(([key, value]) => (
						<MenuItem key={key} value={key}>
							{value}
						</MenuItem>
					))}
				</Select>
				{errors.secondaryCategory && <Typography color='error'>{errors.secondaryCategory}</Typography>}
			</FormControl>
			<TextField
				fullWidth
				label='Name'
				name='name'
				value={menuData.name}
				onChange={handleChange}
				error={!!errors.name}
				helperText={errors.name}
				margin='normal'
			/>
			<TextField
				fullWidth
				label='Description'
				name='description'
				value={menuData.description}
				onChange={handleChange}
				error={!!errors.description}
				helperText={errors.description}
				margin='normal'
			/>
			<TextField
				fullWidth
				label='Price'
				name='price'
				type='number'
				value={menuData.price}
				onChange={handleChange}
				error={!!errors.price}
				helperText={errors.price}
				margin='normal'
			/>
			<Box margin={'normal'} sx={{ mt: 2 }}>
				<Button type='submit' variant='contained'>
					Register Drink
				</Button>
			</Box>
			<Box margin={'normal'} sx={{ mt: 2 }}>
				<Button onClick={() => setView('initial')} variant='contained' color='error'>
					Back
				</Button>
			</Box>
		</Box>
	);

	const renderInitialView = () => (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
			<Typography variant='p'>Press the button to create the menu</Typography>

			<Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
				<Button onClick={() => setView('food')} variant='contained'>
					Food, Dessert
				</Button>
				<Button
					onClick={() => {
						setView('drink');
						setMenuData({ ...menuData, primaryCategory: 'drinks', secondaryCategory: 'none' });
					}}
					variant='contained'
				>
					Drink
				</Button>
			</Box>

			<Box sx={{ mt: 4 }}>
				<Link to={'/data-table'}>View menu list</Link>
			</Box>
		</Box>
	);

	return <Box>{view === 'initial' ? renderInitialView() : view === 'food' ? renderFoodForm() : renderDrinkForm()}</Box>;
};

export default MenuRegistrationPage;
