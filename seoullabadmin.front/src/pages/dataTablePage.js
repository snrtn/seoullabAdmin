import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EditDialog, DeleteDialog } from '../components/dataTable/dialogs';

const DataTablePage = () => {
	const [data, setData] = useState([]);
	const [currentItem, setCurrentItem] = useState({});
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [errors, setErrors] = useState({});
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/seoullab');
			if (response.status === 200 && response.data) {
				const allData = Object.keys(response.data).reduce((acc, category) => {
					const items = response.data[category].map((item) => ({
						...item,
						id: item._id,
						category,
					}));
					return acc.concat(items);
				}, []);
				setData(allData);
			} else {
				console.error('No data returned:', response);
			}
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleOpenEditDialog = (item) => {
		setCurrentItem(item);
		setOpenEditDialog(true);
	};

	const handleOpenDeleteDialog = (item) => {
		setCurrentItem(item);
		setOpenDeleteDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};

	const handleSaveChanges = async () => {
		if (!currentItem.primaryCategory || !currentItem.secondaryCategory || !currentItem.name || !currentItem.price) {
			alert('All fields are required.');
			return;
		}

		try {
			const response = await axios.put(
				`http://localhost:3000/api/seoullab/${currentItem.primaryCategory}/${currentItem._id}`,
				currentItem,
			);
			if (response.data.success) {
				handleCloseDialog();
				const updatedData = data.map((item) => (item.id === currentItem.id ? { ...item, ...currentItem } : item));
				setData(updatedData);
				alert('Menu item updated successfully!');
			} else {
				throw new Error(response.data.message || 'Update failed for an unknown reason');
			}
		} catch (error) {
			console.error('Update failed:', error);
			setErrors({ save: error.message || 'Failed to update menu item.' });
			alert('Update failed: ' + (error.message || 'Unknown error'));
		}
	};

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this menu item?')) return;

		try {
			const response = await axios.delete(
				`http://localhost:3000/api/seoullab/${currentItem.primaryCategory}/${currentItem._id}`,
			);
			if (response.data.success) {
				handleCloseDialog();
				const filteredData = data.filter((item) => item.id !== currentItem.id);
				setData(filteredData);
				alert('Menu item deleted successfully!');
			} else {
				throw new Error(response.data.message || 'Delete failed for an unknown reason');
			}
		} catch (error) {
			console.error('Delete failed:', error);
			setErrors({ delete: error.message || 'Failed to delete menu item.' });
			alert('Delete failed: ' + (error.message || 'Unknown error'));
		}
	};

	const columns = [
		{ field: 'primaryCategory', headerName: 'Category', flex: 1 },
		{ field: 'secondaryCategory', headerName: 'Type', flex: 1 },
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'description', headerName: 'Description', flex: 3 },
		{ field: 'price', headerName: 'Price', type: 'number', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			flex: 1,
			renderCell: (params) => (
				<>
					<IconButton onClick={() => handleOpenEditDialog(params.row)} color='primary'>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => handleOpenDeleteDialog(params.row)} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</>
			),
		},
	];

	return (
		<div style={{ height: 400, width: '100%' }}>
			{isMobile && (
				<Typography variant='body2' style={{ textAlign: 'center', color: 'red', padding: '10px' }}>
					Please use landscape mode for the best experience.
				</Typography>
			)}
			<DataGrid rows={data} columns={columns} pageSize={5} />
			<Box sx={{ mt: 4, pl: 4, pb: 10 }}>
				<Link to={'/menu-registration'}>Add Menu</Link>
			</Box>
			<EditDialog
				open={openEditDialog}
				handleClose={handleCloseDialog}
				item={currentItem}
				handleChange={handleOpenEditDialog}
				handleSave={handleSaveChanges}
				errors={errors}
			/>
			<DeleteDialog open={openDeleteDialog} handleClose={handleCloseDialog} handleDelete={handleDelete} />
		</div>
	);
};

export default DataTablePage;
