/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { EditDialog, DeleteDialog, ImageDialog } from '../components/dataTable/dialogs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const DataTablePage = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openImageDialog, setOpenImageDialog] = useState(false);
	const [currentItem, setCurrentItem] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	const fetchMenus = () => {
		axios
			.get('http://localhost:3000/api/seoullab')
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching menus:', error);
				setError('Failed to load data');
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchMenus();
	}, []);

	const handleOpenEditDialog = (item) => {
		setCurrentItem(item);
		setSelectedImage(item.imageUrl); // Set initial image preview
		setOpenEditDialog(true);
	};

	const handleOpenDeleteDialog = (item) => {
		setCurrentItem(item);
		setOpenDeleteDialog(true);
	};

	const handleOpenImageDialog = (imageUrl) => {
		setSelectedImageUrl(imageUrl);
		setOpenImageDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
		setOpenImageDialog(false);
		setCurrentItem({});
		setSelectedImage(null);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setSelectedImage(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSaveChanges = () => {
		axios({
			method: 'put',
			url: `http://localhost:3000/api/seoullab/${currentItem._id}`,
			data: {
				name: currentItem.name,
				category: currentItem.category,
				description: currentItem.description,
				price: currentItem.price,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				fetchMenus(); // 데이터 테이블 새로고침
				handleCloseDialog();
			})
			.catch((error) => {
				console.error('Error updating menu:', error);
				alert('Failed to update menu item.');
			});
	};

	const handleDelete = () => {
		setIsDeleting(true); // 삭제 시작 시 로딩 상태 설정
		axios
			.delete(`http://localhost:3000/api/seoullab/${currentItem._id}`)
			.then((response) => {
				fetchMenus(); // 데이터 테이블을 새로고침
				handleCloseDialog(); // 다이얼로그 창을 닫습니다
				setIsDeleting(false); // 로딩 상태 해제
			})
			.catch((error) => {
				console.error('Error deleting menu:', error);
				alert(`Failed to delete menu item: ${error.response?.data?.message || 'Server error'}`);
				setIsDeleting(false); // 로딩 상태 해제
			});
	};
	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'category', headerName: 'Category', flex: 1 },
		{ field: 'description', headerName: 'Description', flex: 3 },
		{ field: 'price', headerName: 'Price', flex: 1 },
		{
			field: 'imageUrl',
			headerName: 'Image',
			flex: 1,
			renderCell: (params) => (
				<Button onClick={() => handleOpenImageDialog(params.value)}>
					<img src={params.value} alt='Menu' style={{ width: 50, height: 50 }} />
				</Button>
			),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			width: 150,
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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div style={{ width: '100%', margin: 'auto' }}>
			<DataGrid rows={data} columns={columns} pageSize={5} autoHeight getRowId={(row) => row._id} />

			<Link to={'/menu-registration'}>
				<Button variant='contained'>Add Menu</Button>
			</Link>

			<EditDialog
				open={openEditDialog}
				handleClose={handleCloseDialog}
				item={currentItem}
				handleChange={(e) => setCurrentItem({ ...currentItem, [e.target.name]: e.target.value })}
				handleSave={handleSaveChanges}
			/>
			<DeleteDialog open={openDeleteDialog} handleClose={handleCloseDialog} handleDelete={handleDelete} />
			<ImageDialog open={openImageDialog} handleClose={handleCloseDialog} imageUrl={selectedImageUrl} />
		</div>
	);
};

export default DataTablePage;
