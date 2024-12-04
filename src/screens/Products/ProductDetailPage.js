import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, Rating, IconButton, Badge } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbars from '../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the cart icon

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';

  // States for handling review submission
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(() => {
    // Get reviews from localStorage if available
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  // Cart management
  const [cartCount, setCartCount] = useState(() => {
    
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart).length : 0;
  });

  // Fetch reviews for the product when the component mounts
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await fetch(`${NGROK_URL}/v1.0/reviews/${product.id}`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       const result = await response.json();

  //       if (result.success) {
  //         setReviews(result.reviews);
  //         // Persist the reviews in localStorage
  //         localStorage.setItem('reviews', JSON.stringify(result.reviews));
  //       } else {
  //         toast.error(`Error fetching reviews: ${result.message}`);
  //       }
  //     } catch (error) {
  //       toast.error(`Error fetching reviews: ${error.message}`);
  //     }
  //   };

  //   if (product) {
  //     fetchReviews();
  //   }
  // }, [product]);

  // Check if the user has already reviewed this product
  const hasReviewed = reviews.some((review) => review.userId === localStorage.getItem('userId'));

  // Handle adding to cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${NGROK_URL}/v1.0/cart/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);

        
        const savedCart = localStorage.getItem('cart');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        cartItems.push({ productId: product.id, quantity: 1 }); 
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update cart count
        setCartCount(cartItems.length);
      } else {
        toast.error(`Error adding product to cart: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error adding product to cart: ${error.message}`);
    }
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    if (hasReviewed) {
      toast.error('You have already submitted a review for this product.');
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const reviewData = {
      rating,
      comment,
      productId: product.id,
      categoryId: product.categoryId,
      userId: userId,
    };

    try {
      const response = await fetch(`${NGROK_URL}/v1.0/reviews/create_review`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Review submitted successfully!');
        setRating(0);
        setComment('');
        setReviews(prevReviews => {
          const updatedReviews = [...prevReviews, result.review];
          // Persist updated reviews in localStorage
          localStorage.setItem('reviews', JSON.stringify(updatedReviews));
          return updatedReviews;
        });
      } else {
        toast.error(`Error submitting review: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error submitting review: ${error.message}`);
    }
  };

  if (!product) {
    return (
      <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Box>
      <Navbars />
      <ToastContainer />
      <Box display="flex" justifyContent="center" mt={10} p={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="400"
                image={product.image || '/placeholder.jpg'}
                alt={product.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFB200' }}>
                Rs: {product.price}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: 'black' }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Box>

      {/* Review Section */}
      <Box display="flex" justifyContent='center' mt={1} p={3}>
        <Grid container spacing={4} sx={{ maxWidth: 800 }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Leave a Review
            </Typography>
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
            <TextField
              label="Comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: 'black' }}
              onClick={handleSubmitReview}
              disabled={hasReviewed}
            >
              Submit Review
            </Button>
            {hasReviewed && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                You have already submitted a review for this product.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Display Reviews */}
      <Box display="flex" justifyContent="center" mt={2} p={3} sx={{ backgroundColor: '#eff0f5' }}>
        <Grid container sx={{ maxWidth: 800 }}>
          {/* Heading for Product Reviews */}
          <Grid item xs={12}>
            <Typography variant="p" sx={{ fontWeight: 'bold' }}>
              Product Reviews and Comments
            </Typography>
          </Grid>

          {/* Reviews Section */}
          {reviews.length === 0 ? (
            <Typography variant="body1" sx={{ width: '100%' }}>
              No reviews yet. Be the first to leave a review!
            </Typography>
          ) : (
            reviews.map((review) => (
              <Grid item xs={12} key={review.id}>
              <Card sx={{ padding: 2, boxShadow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {review.userName} - <Rating value={review.rating} readOnly size="small" />
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'gray' }}>
                    {new Date(review.createdat).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Card>
            </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetailPage;
