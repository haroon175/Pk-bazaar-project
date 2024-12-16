import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Navbars from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CreateProduct from "./CreateProduct"; 
import { toast, ToastContainer } from 'react-toastify';

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const NGROK_URL = "https://organization-gibson-explorer-intended.trycloudflare.com/api";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
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
        if (data.status === "success") {
          setProducts(data.data.products);
          setPagination(data.data.pagination);
        } else {
          toast.error("Error: Products data not found");
        }
      } catch (error) {
        toast.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${NGROK_URL}/v1.0/cart/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const result = await response.json();
  
      
      if (result.success) {
        toast.success(result.message); 
      } else {
        toast.error(`Error adding product to cart: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error adding product to cart: ${error.message}`);
    }
  };
  

  const handleMenuClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${NGROK_URL}/v1.0/product/productsDelete/${selectedProductId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        toast.success("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProductId)
        );
      } else {
        toast.error("Error deleting product:", result.message);
      }
    } catch (error) {
      toast.error("Error deleting product:", error);
    } finally {
      handleMenuClose();
    }
  };

  const handleCreateNewProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleProductCreated = (newOrUpdatedProduct) => {
    if (selectedProduct) {
      // Update product in the list
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === newOrUpdatedProduct.id ? newOrUpdatedProduct : product
        )
      );
    } else {
      // Add new product to the list
      setProducts((prevProducts) => [...prevProducts, newOrUpdatedProduct]);
    }
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Typography variant="body1" style={{ textAlign: "center", marginTop: "20px" }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Box>
      <Navbars />
      <Box sx={{ marginTop: "70px" }}>
        {/* <Carousel /> */}
        <Box>
          <Container>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginTop: "80px", marginLeft: "20px", color: "#00224D" }}
          >
           Products
          </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" p={3}>
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card sx={{ maxWidth: 300, boxShadow: 3, position: "relative", backgroundColor:'whitesmoke'}}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.image}
                        alt={product.name}
                        onClick={() =>
                          navigate("/product-detail", { state: { product, productId: product.id } })
                        }
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 10, right: 10 }}
                        onClick={(event) => handleMenuClick(event, product.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedProductId === product.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleEditProduct(product)}>Update</MenuItem>
                        <MenuItem onClick={handleDeleteProduct}>Delete</MenuItem>
                      </Menu>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {product.name}
                        </Typography>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", color: "#f85606" }}
                            >
                              Rs: {product.price}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ backgroundColor: "black" }}
                              onClick={() => handleAddToCart(product.id)} // Pass product id here
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
      </Box>
      {/* <Footer /> */}
      <CreateProduct
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={handleProductCreated}
        selectedProduct={selectedProduct}
      />
      <ToastContainer />
    </Box>
  );
};

export default ProductPage;
