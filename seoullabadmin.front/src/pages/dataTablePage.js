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
			const response = await axios.get('http://localhost:3000/api/menus');
			setData(response.data);
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
		if (item.primaryCategory === 'drinks') {
			console.log('The category is drinks. Prepare for different setup in dialog.');
		}
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
		try {
			await axios.put(`http://localhost:3000/api/menus/${currentItem._id}`, currentItem);
			handleCloseDialog();
			fetchData();
		} catch (error) {
			console.error('Update failed:', error);
			setErrors({ save: 'Failed to update menu item.' });
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:3000/api/menus/${currentItem._id}`);
			handleCloseDialog();
			fetchData();
		} catch (error) {
			console.error('Delete failed:', error);
			setErrors({ delete: 'Failed to delete menu item.' });
		}
	};

	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'primaryCategory', headerName: 'Category', flex: 1 },
		{ field: 'secondaryCategory', headerName: 'Type', flex: 1 },
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
			<Box sx={{ mt: 4 }}>
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
