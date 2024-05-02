import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';

export const EditDialog = ({ open, handleClose, item, handleChange, handleSave }) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>Edit Menu</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin='dense'
				label='Name'
				type='text'
				fullWidth
				value={item.name || ''}
				onChange={handleChange}
			/>
			<TextField select label='Category' fullWidth margin='dense' value={item.category || ''} onChange={handleChange}>
				<MenuItem value='Appetizer'>Appetizer</MenuItem>
				<MenuItem value='Main Course'>Main Course</MenuItem>
				<MenuItem value='Dessert'>Dessert</MenuItem>
			</TextField>
			<TextField
				margin='dense'
				label='Description'
				type='text'
				fullWidth
				multiline
				rows={4}
				value={item.description || ''}
				onChange={handleChange}
			/>
			<TextField
				margin='dense'
				label='Price'
				type='number'
				fullWidth
				value={item.price || ''}
				onChange={handleChange}
			/>
			{item.selectedImage && <img src={item.selectedImage} alt='Preview' style={{ width: '100%', height: 'auto' }} />}
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

export const ImageDialog = ({ open, handleClose, imageUrl }) => (
	<Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
		<DialogTitle>View Image</DialogTitle>
		<DialogContent>
			<img src={imageUrl} alt='Selected' style={{ width: '100%' }} />
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Close</Button>
		</DialogActions>
	</Dialog>
);
