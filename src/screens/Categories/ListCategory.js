import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbars from '../Navbar/Navbar';
import { Card, CardContent, CardMedia, Grid, Typography, CircularProgress, Box, Container } from '@mui/material';
import Slider from '../Slider/Slider';
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel/Carousel';

const ListCategory = () => {
  const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track any API errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await fetch(`${NGROK_URL}/v1.0/category/getAllCategory`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories); // Ensure categories is an array
        } else {
          setCategories([]);
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: 'center', marginTop: '50px' }}>
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <div>
      <Navbars />
      {/* <Slider /> */}
      <Box sx={{marginTop:'70px'}}>
        <Container>
      <Carousel/>
      <h3 style={{ marginTop: '60px', marginLeft: '20px', color: '#00224D' }}>Categories</h3>
      <Grid container spacing={3} style={{ padding: '20px' }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card
              sx={{ marginTop: '-10px', cursor: 'pointer' }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image} 
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      <Footer />
      </Box>
    </div>
  );
};

export default ListCategory;
