import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, Grid, CardMedia, Button, Container } from '@mui/material';
import Navbars from '../Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel/Carousel';

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `${NGROK_URL}/v1.0/product/products?page=1&pageSize=10&categoryId=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 'success') {
          setProducts(data.data.products); // Access products array
          setPagination(data.data.pagination); // Store pagination info
        } else {
          console.error('Error: Products data not found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${NGROK_URL}/v1.0/cart/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        console.log('Product added to cart successfully');
      } else {
        console.error('Error adding product to cart:', result.message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Box>
      <Navbars />
      {/* <Slider /> */}
      <Box sx={{marginTop:'70px'}}>
      <Carousel/>
      <Box>
        <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={10} p={3}>
        {/* <Typography variant="h4" gutterBottom>
          Products
        </Typography> */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{ maxWidth: 300, boxShadow: 3, cursor: 'pointer' }}
                onClick={() => navigate('/product-detail', { state: { product, productId: product.id } })}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {product.name}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography> */}
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#f85606' }}>
                       Rs: {product.price}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: 'black' }}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {pagination && (
          <Box mt={4}>
            <Typography variant="body2" color="textSecondary">
              Page {pagination.currentPage} of {pagination.totalPages}
            </Typography>
          </Box>
        )}
      </Box>
      </Container>
      </Box>
      <Footer />
      </Box>
    </Box>
  );
};

export default ProductPage;
