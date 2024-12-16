import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import Shopimg from '../../images/shop.jpeg';
const Store = () => {
  const [openShopModal, setOpenShopModal] = useState(false);
  const [shopCreated, setShopCreated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('Lahore');

  const GOOGLE_API_KEY = 'AIzaSyAc3DqQ3S7Fw69Jka2GRpVJUcU7umi8Yqo'; 
  const NGROK_URL = 'https://organization-gibson-explorer-intended.trycloudflare.com/api';

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            await fetchLocationName(latitude, longitude);
          },
          (error) => {
            console.error(error);
            toast.error('Failed to get your location. Please allow location access.');
          }
        );
      } else {
        toast.error('Geolocation is not supported by your browser.');
      }
    };

    getLocation();
  }, []);

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results && response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setLocationName(formattedAddress);
      } else {
        toast.error('Unable to determine location name.');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      toast.error('Error fetching location name.');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Shop name is required'),
    description: Yup.string().required('Description is required'),
    logo: Yup.string().url('Enter a valid URL for the logo').required('Logo URL is required'),
    shopSpecialist: Yup.string().required('Shop Specialist is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      logo: '',
      shopSpecialist: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!location || !locationName) {
        toast.error('Location is required');
        return;
      }
    
      const token = localStorage.getItem('token');
      const ownerId = 1; 
      const { latitude, longitude } = location;
    
      try {
        const response = await axios.post(
          `${NGROK_URL}/v1.0/shop/create`,
          { ...values, ownerId, latitude, longitude, locationName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        if (response.data.success) {          
          const shopData = {
            ...values,
            ownerId,
            latitude,
            longitude,
            locationName,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem('shopData', JSON.stringify(shopData));
    
          toast.success(response.data.message || 'Shop created successfully');
          setShopCreated(true);
          setOpenShopModal(false);
        } else {
          toast.error(response.data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to create shop';
        toast.error(errorMessage);
      }
    }
  });

  const handleOpenShopModal = () => setOpenShopModal(true);
  const handleCloseShopModal = () => setOpenShopModal(false);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', marginTop: '80px' }}>
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', textShadow: 3 }}>
          Welcome to the <span style={{ color: '#f85606', fontWeight: 'bold' }}>Pk</span>
          <span style={{ color: '#f85606', fontWeight: 'bold' }}>Bazaar</span> and Create your Shop
        </Typography>
        <p style={{textAlign:'center'}}>Note: you can create your shop only one time </p>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleOpenShopModal}
            sx={{ backgroundColor: '#00224D' }}
            disabled={shopCreated}
          >
            Create Shop
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={shopCreated ? 'success' : 'warning'}
            sx={{ width: '100%' }}
          >
            {shopCreated ? 'Shop created successfully!' : 'Please enter a shop name!'}
          </Alert>
        </Snackbar>
      </div>

      <Dialog open={openShopModal} onClose={handleCloseShopModal} fullWidth maxWidth="sm">
        <DialogTitle>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
          <Avatar alt="Profile Image" src={Shopimg} sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#f85606', textAlign: 'center' }}
          >
            Create Shop
          </Typography>
        </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Shop Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Logo URL"
              name="logo"
              value={formik.values.logo}
              onChange={formik.handleChange}
              error={formik.touched.logo && Boolean(formik.errors.logo)}
              helperText={formik.touched.logo && formik.errors.logo}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Shop Specialist"
              name="shopSpecialist"
              value={formik.values.shopSpecialist}
              onChange={formik.handleChange}
              error={formik.touched.shopSpecialist && Boolean(formik.errors.shopSpecialist)}
              helperText={formik.touched.shopSpecialist && formik.errors.shopSpecialist}
              margin="normal"
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Current Location:</strong> {locationName || 'Fetching location...'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShopModal} variant="outlined" sx={{ color: '#00224D', borderColor: '#00224D' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#f85606' }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
<ToastContainer/>      
    </div>
  );
};

export default Store;
