import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Box, 
  Typography, 
  Grid
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import Navbars from "../Navbar/Navbar";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const NGROK_URL = "https://thank-rug-effort-stop.trycloudflare.com/api";

  useEffect(() => {
    
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await axios.get(`${NGROK_URL}/v1.0/cart/getAllCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Data:", response.data);
      setCartItems(response.data.data || []); // Set the data array
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${NGROK_URL}/user/cart/${productId}`); 
      setCartItems((prevItems) =>
        prevItems.map((cart) => ({
          ...cart,
          CartProducts: cart.CartProducts.filter((product) => product.product.id !== productId),
        }))
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdate = (productId) => {
    console.log("Update item:", productId);
  };

  return (
    <Box>
      <Navbars />
      <Grid container spacing={2} sx={{ marginTop: '70px' }}>
      {/* Left Column: Table */}
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f85606' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cart) =>
                cart.CartProducts.map((productItem) => {
                  const product = productItem.product; 
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={product.image} alt={product.name} width={50} height={50} />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleUpdate(product.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Right Column: Order Summary */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          <h3>Order Summary</h3>
          {/* Example order summary content */}
          <p><strong>Total Items:</strong> {cartItems.length}</p>
          <p><strong>Total Price:</strong> ${cartItems.reduce((total, cart) => {
            return total + cart.CartProducts.reduce((sum, productItem) => sum + productItem.product.price, 0);
          }, 0).toFixed(2)}</p>
          {/* Add more order summary details as needed */}
        </Paper>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ShoppingCart;
