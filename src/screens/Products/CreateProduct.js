import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Product from '../../images/product.png';
import { useDropzone } from 'react-dropzone';

const CreateProduct = ({ open, onClose, onProductCreated, selectedProduct }) => {
  const [productData, setProductData] = useState({ name: '', description: '', price: '', categoryId: '' });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const NGROK_URL = 'https://organization-gibson-explorer-intended.trycloudflare.com/api';

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${NGROK_URL}/v1.0/category/getAllCategory/load`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          setCategories([]);
          console.error('Unexpected response format:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories. Please try again later.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      // Populate fields for updating the product
      setProductData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        categoryId: selectedProduct.categoryId,
      });
      setImagePreview(selectedProduct.image || '');
      setImage(selectedProduct.image || null);
    } else {
      // Reset fields for creating a new product
      setProductData({ name: '', description: '', price: '', categoryId: '' });
      setImagePreview('');
      setImage(null);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImagePreview(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const uploadPayload = new FormData();
      uploadPayload.append('image', file);

      const response = await axios.post(
        `${NGROK_URL}/v1.0/aws/upload/upload`,
        uploadPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data && response.data.imageUrl) {
        setImage(response.data.imageUrl);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Image URL not returned from the server.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!productData.name || !productData.description || !productData.price || !productData.categoryId || !image) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }
  
    const price = parseFloat(productData.price);
    if (isNaN(price)) {
      toast.error('Price must be a valid number');
      return;
    }
  
    onClose(); // Close the modal or form
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage');
  
      const payload = {
        name: productData.name.trim(),
        description: productData.description.trim(),
        price,
        categoryId: productData.categoryId,
        image: [image],
      };
  
      const url = selectedProduct
        ? `${NGROK_URL}/v1.0/product/productsUpdate/${selectedProduct.id}`
        : `${NGROK_URL}/v1.0/product/products`;
      const method = selectedProduct ? 'put' : 'post';
  
      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const responseData = response.data.product || response.data;
  
      toast.success(selectedProduct ? 'Product updated successfully!' : 'Product created successfully!');
  
      // Update the local products list in localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = selectedProduct
        ? existingProducts.map((product) =>
            product.id === selectedProduct.id ? { ...product, ...responseData } : product
          )
        : [...existingProducts, responseData];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
  
      // Callback to update the parent state or UI
      onProductCreated(responseData);
    } catch (error) {
      console.error('Failed to save product', error);
      toast.error('Something went wrong! Failed to save product.');
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Avatar alt="Product Image" src={Product} sx={{ width: 80, height: 80, mb: 1, mt: 2 }} />
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#f85606', textAlign: 'center' }}
        >
          {selectedProduct ? 'Update Product' : 'Create Product'}
        </Typography>
      </Box>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
        />
        <Select
          fullWidth
          value={productData.categoryId}
          onChange={(e) => setProductData({ ...productData, categoryId: e.target.value })}
          displayEmpty
          sx={{ mt: 2 }}
        >
          <MenuItem value="" disabled>
            {loadingCategories ? 'Loading categories...' : 'Select a category'}
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #f85606',
            p: 2,
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive ? '#f9f9f9' : 'transparent',
            mt: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <input {...getInputProps()} style={{ display: 'none' }} />
          
          <Button
            variant="contained"
           
            onClick={(e) => {
              e.stopPropagation(); 
              document.querySelector('input[type="file"]').click();
            }}
            sx={{backgroundColor:'#f85606'}}
          >
            Upload Image
          </Button>
          <span style={{textAlign:'center', marginLeft:'3px'}}>or</span>
          <Typography sx={{ flex: 1 }}>
            {isDragActive
              ? 'Drop the file here...'
              : 'Drag & drop an image or click to select'}
          </Typography>
        </Box>


        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Preview"
            style={{
              marginTop: '16px',
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#f85606', borderColor: '#f85606' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: '#f85606' }}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : selectedProduct ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default CreateProduct;
