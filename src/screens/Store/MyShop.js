import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Typography,
  Box,
  Alert,
  Avatar,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
} from '@mui/material';
import CreateProduct from '../Products/CreateProduct';
import CreateCategoryModal from '../Categories/CreateCategoryModal';
import InfoIcon from '@mui/icons-material/Info';
import Navbars from '../Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import StoreIcon from '@mui/icons-material/Store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const NGROK_URL = 'https://organization-gibson-explorer-intended.trycloudflare.com/api';
const GET_SHOP_API_URL = '/v1.0/shop/get_all_shops';

const MyStore = ({ shopId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate()
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenCategoryModal(true);
  };

  const handleCloseModal = () => {
    setOpenCategoryModal(false);
  };

  const handleProductCreated = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    handleClose();
  };

  useEffect(() => {
    const fetchShopDetails = async () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      setRole(userRole);

      try {
        setLoading(true);
        const localShopData = localStorage.getItem('shopData');
        if (localShopData) {
          const shopData = JSON.parse(localShopData);
          setShop(shopData);
        } else if (shopId) {
          const response = await axios.get(`${NGROK_URL}${GET_SHOP_API_URL}/${shopId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setShop(response.data);
        } else {
          setError('Shop not found');
        }

        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } catch (err) {
        setError('Failed to fetch shop details');
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  useEffect(() => {
    // Retrieve and parse data from local storage
    const localData = localStorage.getItem('productData');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        // Filter products with valid data
        const validProducts = parsedData.filter((item) => item?.product);
        setProducts(validProducts);
      } catch (error) {
        console.error('Error parsing local storage data:', error);
      }
    }
  }, []);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!shop) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No shop found</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Navbars />
      <Box p={2} sx={{ marginTop: '70px' }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Paper
            sx={{
              padding: 3,
              backgroundColor: 'white',
              width: '800px',
              boxShadow: 5,
              borderRadius: '20px',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} container justifyContent="center" alignItems="flex-start">
                <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
                  <Avatar alt="Shop Logo" src={shop.logo} sx={{ width: 120, height: 120, border: '2px solid #f85606', boxShadow: 5 }} />
                  <Typography variant="body2" sx={{ marginTop: 1, color: '#555', textAlign: 'center', maxWidth: 200, fontSize: '0.875rem', fontStyle: 'italic' }}>
                    {shop.description}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Shop Details</Typography>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <StoreIcon sx={{ color: '#f85606', marginRight: 1 }} />
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }}>{shop.name}</Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ color: '#f85606', marginRight: 1 }} />
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }}>{shop.locationName}</Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <InfoIcon sx={{ color: '#f85606', marginRight: 1 }} />
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }}>
                    {dayjs(shop.createdAt).format('MMMM DD, YYYY hh:mm A')}
                  </Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ color: '#f85606', borderColor: '#f85606' }}
                    onClick={handleOpenModal}
                    disabled={role === 'VENDOR'}
                  >
                    Create Category
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#f85606' }} onClick={handleOpen}>Create Product</Button>
                  <CreateCategoryModal open={openCategoryModal} onClose={handleCloseModal} />
                  <CreateProduct open={openModal} onClose={handleClose} onProductCreated={handleProductCreated} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Container>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Your Created Products</Typography>
            <hr/>
            <Grid container spacing={3}>
              {products.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{backgroundColor:'whitesmoke'}}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.product?.image || 'https://via.placeholder.com/200'}
                      alt={item.product?.name}
                      onClick={() =>
                        navigate("/product-detail")
                      }
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.product?.name}</Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", 
                        marginTop: 1,
                        padding:2
                      }}
                    >
                      <Typography variant="body1" sx={{ marginRight: 2, color:'#f85606', fontWeight:'bold' }}>
                        Rs: {item.product?.price}
                      </Typography>
                      <Button variant="contained" sx={{backgroundColor:'black'}}>
                        Add to Cart
                      </Button>
                    </Box>


                  </Card>
                </Grid>
              ))}
            </Grid>

          </Box>
        </Container>
      </Box>
      {/* <Footer /> */}
    </div>
  );
};

export default MyStore;
