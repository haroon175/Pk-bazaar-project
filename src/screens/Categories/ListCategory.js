import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbars from '../Navbar/Navbar';
import { Card, CardContent, CardMedia, Grid, Typography, Box, Container, CircularProgress, IconButton, Snackbar, Button } from '@mui/material';
import Carousel from '../../components/Carousel/Carousel';
import Footer from '../../components/Footer/Footer';
import CloseIcon from '@mui/icons-material/Close';
import PopupImage from '../../images/store.png'
const ListCategory = () => {
  const NGROK_URL = 'https://organization-gibson-explorer-intended.trycloudflare.com/api';
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const h3Ref = useRef(null);
  const [divWidth, setDivWidth] = useState(0);


  useEffect(() => {
    if (h3Ref.current) {
      setDivWidth(h3Ref.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${NGROK_URL}/v1.0/category/getAllCategory`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
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


    const role = localStorage.getItem('userRole');
    const shopCreated = localStorage.getItem('shopData'); 

    if ((role === 'ADMIN' || role === 'VENDOR') && shopCreated !== 'true') {
      setUserRole(role);
      setOpenToast(false);
    }

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    
    navigate(`/category/${category.id}`, {
      state: { categoryData: category },
    });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

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
      <Box sx={{ marginTop: '70px' }}>
        <Container>
          <Carousel />
          <div>
            <h3
              ref={h3Ref}
              style={{
                marginTop: '60px',
                marginLeft: '20px',
                color: '#00224D',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              All Categories
            </h3>
            <div
              style={{
                width: `${divWidth}px`,
                height: '10px',
                backgroundColor: 'black',
                marginLeft: '20px',
              }}
            ></div>
          </div>
          <Snackbar
            open={openToast}
            autoHideDuration={6000}
            onClose={handleCloseToast}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
              "& .MuiSnackbarContent-root": {
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                boxShadow: 3,
              },
            }}
          >
            <Card sx={{ display: 'flex', width: 350, height: 200 }}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={PopupImage}
                alt="Create Store"
              />
              <CardContent sx={{ flex: '1' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Create your store
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start selling your products by creating your own store today!
                </Typography>
                <Box sx={{ marginTop: '10px' }}>
                  <Button
                    onClick={() => navigate('/createStore')}
                    style={{
                      backgroundColor: '#00224D',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '20px'
                    }}
                  >
                    Create Store
                  </Button>
                </Box>
              </CardContent>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseToast}
                aria-label="close"
                sx={{ position: 'absolute', top: 5, right: 5 }}
              >
                <CloseIcon />
              </IconButton>
            </Card>
          </Snackbar>

          <Grid container spacing={3} style={{ padding: '20px' }}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <Card
                  sx={{
                    marginTop: '-10px',
                    cursor: 'pointer',
                    backgroundColor: 'whitesmoke',
                    // transition: 'transform 0.3s, box-shadow 0.3s',
                    // '&:hover': {
                    //   transform: 'translateY(-10px)',
                    //   boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    // },
                  }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image || '/path/to/default-image.jpg'}
                    alt={category.name}
                    sx={{
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Container>
        {/* <Footer /> */}
      </Box>
    </div>
  );
};

export default ListCategory;
