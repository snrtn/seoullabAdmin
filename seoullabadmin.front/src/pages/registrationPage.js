// registrationPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import {
	RegistrationContainer,
	StyledFormControl,
	StyledTextField,
	StyledButton,
	ErrorMessage,
} from './registrationPage.styles'; // Assuming your styles are in this file
import { Box, InputLabel, Select } from '@mui/material';

const MenuRegistrationPage = () => {
	const [menuData, setMenuData] = useState({
		category: '',
		name: '',
		description: '',
		price: '',
	});
	const [errors, setErrors] = useState({});
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMenuData({ ...menuData, [name]: value });
		setErrors({ ...errors, [name]: '' }); // Remove error when the user starts typing
	};

	const handleFileChange = (e) => {
		const newFile = e.target.files[0];
		setFile(newFile);
		if (newFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(newFile);
		} else {
			setPreviewUrl('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Simple front-end validation
		let validationErrors = {};
		if (!menuData.category) validationErrors.category = 'Category is required.';
		if (!menuData.name) validationErrors.name = 'Name is required.';
		if (!menuData.description) validationErrors.description = 'Description is required.';
		if (!menuData.price) validationErrors.price = 'Price is required.';
		// if (!file) validationErrors.file = 'Image file is required.';

		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		const formData = new FormData();
		formData.append('category', menuData.category);
		formData.append('name', menuData.name);
		formData.append('description', menuData.description);
		formData.append('price', menuData.price);
		formData.append('image', file);

		try {
			const response = await axios.post('http://localhost:3000/register-menu', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (response.data.success) {
				alert('메뉴 등록 성공!');
				setMenuData({ category: '', name: '', description: '', price: '' });
				setFile(null);
				setPreviewUrl('');
			} else {
				alert('메뉴 등록 실패: ' + response.data.message);
			}
		} catch (error) {
			console.error('메뉴 등록 요청 실패:', error);
			alert('서버 오류 발생');
		}
	};

	return (
		<RegistrationContainer>
			<Box component='form' noValidate onSubmit={handleSubmit} sx={{ width: '40vh' }}>
				<StyledFormControl variant='outlined' error={!!errors.category}>
					<InputLabel id='category-label'>Category</InputLabel>
					<Select
						labelId='category-label'
						label='Category'
						name='category'
						value={menuData.category}
						onChange={handleChange}
					>
						<MenuItem value='Appetizer'>Appetizer</MenuItem>
						<MenuItem value='Main Course'>Main Course</MenuItem>
						<MenuItem value='Dessert'>Dessert</MenuItem>
					</Select>
					{errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
				</StyledFormControl>

				<StyledTextField
					error={!!errors.name}
					helperText={errors.name}
					required
					fullWidth
					label='Name'
					name='name'
					value={menuData.name}
					onChange={handleChange}
				/>

				<StyledTextField
					error={!!errors.description}
					helperText={errors.description}
					required
					fullWidth
					label='Description'
					name='description'
					value={menuData.description}
					onChange={handleChange}
				/>

				<StyledTextField
					error={!!errors.price}
					helperText={errors.price}
					required
					fullWidth
					label='Price'
					name='price'
					type='number'
					value={menuData.price}
					onChange={handleChange}
				/>

				{/* <input accept='.jpg, .jpeg, .png' type='file' onChange={handleFileChange} style={{ margin: '20px 0' }} />
				{errors.file && <ErrorMessage>{errors.file}</ErrorMessage>}

				{previewUrl && (
					<Box sx={{ mt: 2, maxHeight: '300px', overflow: 'auto' }}>
						<img src={previewUrl} alt='Preview' style={{ width: '100%', maxHeight: '300px' }} />
					</Box>
				)} */}

				<div>
					<StyledButton type='submit' variant='contained'>
						Register menu
					</StyledButton>
				</div>
				<Link to='/data-table' style={{ textDecoration: 'none' }}>
					<StyledButton variant='contained'>View list</StyledButton>
				</Link>
			</Box>
		</RegistrationContainer>
	);
};

export default MenuRegistrationPage;
