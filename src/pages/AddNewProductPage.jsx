import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { apiCreateProduct, uploadProductImages } from '../api/api';

const validateProductData = (productData) => {
	const {
		name,
		sku,
		category,
		description,
		description_large,
		price,
		stock,
		average_rating,
	} = productData;

	if (
		!name.trim() ||
		!sku.trim() ||
		!category.trim() ||
		!description.trim() ||
		!description_large.trim() ||
		!price ||
		!stock ||
		!average_rating
	) {
		return false;
	}

	if (
		isNaN(price) ||
		price <= 0 ||
		isNaN(stock) ||
		stock <= 0 ||
		average_rating < 0 ||
		average_rating > 5
	) {
		return false;
	}

	return true;
};

const AddProductPage = () => {
	const [editing, setEditing] = useState(true);
	const [productData, setProductData] = useState({
		name: 'DUMMY PRODUCT 1',
		sku: 'DMMP1',
		category: 'aceites',
		description: 'Aceite especial para el pelo',
		description_large: `Este aceite está especialmente diseñado para restaurar la hidratación del cabello seco, dañado o deshidratado. Gracias a su fórmula avanzada, rica en ingredientes naturales como aceites esenciales, proteínas y extractos de plantas, proporciona una hidratación profunda y duradera desde la raíz hasta las puntas. Su acción nutritiva ayuda a suavizar la fibra capilar, reparando el daño y mejorando la textura del cabello, dejándolo más suave, brillante y manejable. Ideal para todo tipo de cabellos, especialmente aquellos que sufren de resequedad debido a factores ambientales, el uso excesivo de productos de styling o la exposición al sol y al agua salada. Al usarlo de manera regular, no solo notarás un cabello más hidratado, sino también fortalecido, con un aspecto saludable y radiante. Este shampoo es perfecto para quienes buscan una solución eficaz para combatir la falta de humedad y restaurar el equilibrio natural de su cabello.
`,
		price: '23.40',
		stock: '20',
		average_rating: '3.5'
	});

	const [imageFiles, setImageFiles] = useState({});
	const [previewImagesUrl, setPreviewImagesUrl] = useState({});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData({ ...productData, [name]: value });
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			const file = files[0];
			const previewUrl = URL.createObjectURL(file);

			setImageFiles((prev) => ({ ...prev, [name]: file }));
			setPreviewImagesUrl((prev) => ({ ...prev, [name]: previewUrl }));
		}
	};

	const resetProductData = () => {
		setProductData({
			name: '',
			sku: '',
			category: '',
			description: '',
			description_large: '',
			price: '',
			stock: '',
			average_rating: '',
		});
		setImageFiles({});
		setPreviewImagesUrl({});
		setEditing(true);
		setSuccess(null);
	};



	const handleCreateProduct = async (productData) => {
		try {
			// save images
			const images = [];
			Object.values(imageFiles).forEach((file) => {
				images.push(file);
			});
			await uploadProductImages(images, productData.sku);

			// post new product
			const data = {
				...productData,
				average_rating: parseFloat(productData.average_rating),
				price: parseFloat(productData.price),
				stock: parseFloat(productData.stock),
			};
			const response = await apiCreateProduct(data);
			if (response.status === 201) {
				setEditing(false);
				setSuccess('Producto creado exitosamente');
			}

		} catch (error) {
			setError(error.response?.data?.message || 'Error creating product');
			console.log(error.response?.data?.message || 'Error creating product');
		}
	};

	useEffect(() => {
		setIsFormValid(validateProductData(productData));
	}, [productData]);

	return (
		<PageContainer>
			<PageHeader title="Agregar Producto"></PageHeader>

			<Box sx={{ margin: '0 auto', maxWidth: '600px' }}>
				<TextField
					label="Nombre del Producto"
					variant="outlined"
					fullWidth
					name="name"
					value={productData.name}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="SKU"
					variant="outlined"
					fullWidth
					name="sku"
					value={productData.sku}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Categoría"
					variant="outlined"
					fullWidth
					name="category"
					value={productData.category}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Descripción Corta"
					variant="outlined"
					fullWidth
					name="description"
					value={productData.description}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Descripción Larga"
					variant="outlined"
					fullWidth
					name="description_large"
					value={productData.description_large}
					onChange={handleChange}
					multiline
					rows={4}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Precio"
					variant="outlined"
					fullWidth
					name="price"
					type="number"
					value={productData.price}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Stock"
					variant="outlined"
					fullWidth
					name="stock"
					type="number"
					value={productData.stock}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Rating Promedio"
					variant="outlined"
					fullWidth
					name="average_rating"
					type="number"
					step="0.1"
					value={productData.average_rating}
					onChange={handleChange}
					sx={{ marginBottom: 2 }}
				/>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						marginBottom: 2,
						alignItems: 'center',
					}}
				>
					<TextField
						variant="outlined"
						fullWidth
						name="imageurl1"
						type="file"
						onChange={handleFileChange}
					></TextField>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '150px',
							height: '150px',
							borderRadius: '10px',
							transition: 'all 0.3s ease-in-out',
							opacity: previewImagesUrl.imageurl1 ? 100 : 0,
							transform: `translateX(${previewImagesUrl.imageurl1 ? 0 : 100}%)`,
						}}
					>
						<img
							src={previewImagesUrl.imageurl1}
							alt="Preview"
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
							}}
						/>
					</Paper>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						marginBottom: 2,
						alignItems: 'center',
					}}
				>
					<TextField
						variant="outlined"
						fullWidth
						name="imageurl2"
						type="file"
						onChange={handleFileChange}
					></TextField>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '150px',
							height: '150px',
							borderRadius: '10px',
							transition: 'all 0.3s ease-in-out',
							opacity: previewImagesUrl.imageurl2 ? 100 : 0,
							transform: `translateX(${previewImagesUrl.imageurl2 ? 0 : 100}%)`,
						}}
					>
						<img
							src={previewImagesUrl.imageurl2}
							alt="Preview"
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
							}}
						/>
					</Paper>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						marginBottom: 2,
						alignItems: 'center',
					}}
				>
					<TextField
						variant="outlined"
						fullWidth
						name="imageurl3"
						type="file"
						onChange={handleFileChange}
					></TextField>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '150px',
							height: '150px',
							borderRadius: '10px',
							transition: 'all 0.3s ease-in-out',
							opacity: previewImagesUrl.imageurl3 ? 100 : 0,
							transform: `translateX(${previewImagesUrl.imageurl3 ? 0 : 100}%)`,
						}}
					>
						<img
							src={previewImagesUrl.imageurl3}
							alt="Preview"
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
							}}
						/>
					</Paper>
				</Box>

				{error && <Typography color="error">{error}</Typography>}
				<Box
					sx={{
						marginTop: 2,
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					{success && <Typography color="success">{success}</Typography>}
					<Box sx={{ display: editing ? 'flex' : 'none', gap: 2 }}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleCreateProduct(productData)}
							disabled={!isFormValid}
						>
							Guardar
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => setEditing(false)}
						>
							Cancelar
						</Button>
					</Box>
					<Box sx={{ display: editing ? 'none' : 'flex' }}>
						<Button
							variant="contained"
							color="primary"
							onClick={resetProductData}
						>
							Nuevo Producto
						</Button>
					</Box>
				</Box>
			</Box>
		</PageContainer>
	);
};

export default AddProductPage;
