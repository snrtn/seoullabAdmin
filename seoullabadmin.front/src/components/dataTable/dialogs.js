import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Typography,
} from '@mui/material';

export const foodOptions = {
	starters: 'Entrées',
	mains: 'Plats',
	desserts: 'Desserts',
};
export const foodTypeOptions = {
	none: 'None',
	vegetarian: 'Vegetarian',
	eveningMenu: 'Evening Menu',
};
export const drinkOptions = {
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

export const EditDialog = ({ open, handleClose, item, handleChange, handleSave, errors }) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>Edit Menu</DialogTitle>
		<DialogContent>
			{item.primaryCategory === 'drinks' ? (
				<>
					<FormControl fullWidth margin='normal'>
						<TextField InputProps={{ readOnly: true }} label='Category' value='Drinks' variant='filled' />
					</FormControl>
					<FormControl fullWidth margin='normal'>
						<InputLabel id='secondary-category-label'>Drink Type</InputLabel>
						<Select
							labelId='secondary-category-label'
							name='secondaryCategory'
							value={drinkOptions.secondaryCategory}
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
				</>
			) : (
				<FormControl fullWidth margin='normal'>
					<InputLabel id='primary-category-label'>Category</InputLabel>
					<Select
						labelId='primary-category-label'
						name='primaryCategory'
						value={item.primaryCategory || ''}
						onChange={(e) => handleChange({ ...item, primaryCategory: e.target.value })}
						error={!!errors.primaryCategory}
						helperText={errors.primaryCategory || 'Category is required.'}
					>
						<MenuItem value='starters'>Entrées</MenuItem>
						<MenuItem value='mains'>Plats</MenuItem>
						<MenuItem value='desserts'>Desserts</MenuItem>
					</Select>
				</FormControl>
			)}

			<TextField
				fullWidth
				margin='normal'
				label='Name'
				value={item.name || ''}
				onChange={(e) => handleChange({ ...item, name: e.target.value })}
				error={!!errors.name}
				helperText={errors.name || 'Name is required.'}
			/>
			<TextField
				fullWidth
				margin='normal'
				label='Description'
				multiline
				rows={4}
				value={item.description || ''}
				onChange={(e) => handleChange({ ...item, description: e.target.value })}
				error={!!errors.description}
				helperText={errors.description || 'Description is required.'}
			/>
			<TextField
				fullWidth
				margin='normal'
				label='Price'
				type='number'
				value={item.price || ''}
				onChange={(e) => handleChange({ ...item, price: e.target.value })}
				error={!!errors.price}
				helperText={errors.price || 'Price is required.'}
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleSave}>Save</Button>
		</DialogActions>
	</Dialog>
);

export const DeleteDialog = ({ open, handleClose, handleDelete }) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>Confirm Delete</DialogTitle>
		<DialogContent>Are you sure you want to delete this item?</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleDelete} color='secondary'>
				Delete
			</Button>
		</DialogActions>
	</Dialog>
);
