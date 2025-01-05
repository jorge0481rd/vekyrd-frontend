import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { apiCreateProduct, apiPostProductImages } from '../api/api';

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: 'DUMMY PRODUCT 1',
    sku: 'DMMP1',
    category: 'aceites',
    description: 'Aceite especial para el pelo',
    description_large: `Este aceite está especialmente diseñado para restaurar la hidratación del cabello seco, dañado o deshidratado. Gracias a su fórmula avanzada, rica en ingredientes naturales como aceites esenciales, proteínas y extractos de plantas, proporciona una hidratación profunda y duradera desde la raíz hasta las puntas. Su acción nutritiva ayuda a suavizar la fibra capilar, reparando el daño y mejorando la textura del cabello, dejándolo más suave, brillante y manejable. Ideal para todo tipo de cabellos, especialmente aquellos que sufren de resequedad debido a factores ambientales, el uso excesivo de productos de styling o la exposición al sol y al agua salada. Al usarlo de manera regular, no solo notarás un cabello más hidratado, sino también fortalecido, con un aspecto saludable y radiante. Este shampoo es perfecto para quienes buscan una solución eficaz para combatir la falta de humedad y restaurar el equilibrio natural de su cabello.
`,
    price: '23.40',
    stock: '20',
    average_rating: '3.5',
    imageurl1: '/img/products/dummy.png',
    imageurl2: '/img/products/dummy.png',
    imageurl3: '/img/products/dummy.png',
  });

  const [imageFiles, setImageFiles] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileName = `${Date.now().toString().substring(0, 6)}_${file.name}`;
      const imageUrl = `/img/products/${fileName}`;

      setImageFiles((prev) => ({ ...prev, [name]: file }));
      setProductData((prev) => ({ ...prev, [name]: imageUrl }));
    }
  };

  const saveImagesToPublicFolder = async () => {
    const formData = new FormData();

    Object.values(imageFiles).forEach((file, index) => {
      formData.append(`image${index + 1}`, file);
    });

    try {
      const response = await apiPostProductImages(formData);

      if (response.status === 200) {
        const data = await response.json();

        setProductData({
          ...productData,
          imageurl1: data.image1Url,
          imageurl2: data.image2Url,
          imageurl3: data.image3Url,
        });
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      // save images
      await saveImagesToPublicFolder();

      // post new product
      const data = {
        ...productData,
        average_rating: parseFloat(productData.average_rating),
        price: parseFloat(productData.price),
        stock: parseFloat(productData.stock),
      };
      const response = await apiCreateProduct(data);
      if (response.status === 201) {
        navigate('/products');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating product');
    }
  };

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
        <TextField
          label="Imagen 1"
          variant="outlined"
          fullWidth
          name="imageurl1"
          type="file"
          onChange={handleFileChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Imagen 2"
          variant="outlined"
          fullWidth
          name="imageurl2"
          type="file"
          onChange={handleFileChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Imagen 3"
          variant="outlined"
          fullWidth
          name="imageurl3"
          type="file"
          onChange={handleFileChange}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateProduct(productData)}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/products')}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AddProductPage;
