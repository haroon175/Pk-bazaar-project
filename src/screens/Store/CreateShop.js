import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Avatar, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shopimg from '../../images/shop.jpeg';
import axios from 'axios';

const CreateShop = ({ open, onClose, onShopCreated }) => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('Lahore');

  const GOOGLE_API_KEY = 'AIzaSyAc3DqQ3S7Fw69Jka2GRpVJUcU7umi8Yqo';

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
  
  // Function to fetch the location name from Google Maps API
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      
      // Log the response to ensure it's being received correctly
      console.log('Geocode API response:', response.data);
      
      if (response.data.results && response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        console.log('Formatted address:', formattedAddress);  // Log the address
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

  const NGROK_URL = 'https://bookmarks-programmes-violations-podcast.trycloudflare.com/api';

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
  
        // Success response handling
        if (response.data.success) {
          toast.success(response.data.message || 'Shop created successfully');
          onShopCreated(); 
          onClose(); 
        } else {
          toast.error(response.data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        // Error response handling
        const errorMessage = error.response?.data?.message || 'Failed to create shop';
        toast.error(errorMessage);
      }
    },
  });
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar alt="Profile Image" src={Shopimg} sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#f85606', textAlign: 'center' }}
          >
            Create Shop
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onClose} variant="outlined" sx={{ color: '#00224D', borderColor: '#00224D' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#f85606' }}>
              Submit
            </Button>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default CreateShop;
