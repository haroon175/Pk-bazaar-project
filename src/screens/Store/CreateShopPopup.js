import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

function CreateShopPopup() {
  const [isVisible, setIsVisible] = useState(true);

  // Toggle the visibility of the card every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevState) => !prevState);
    }, 3000); // Toggle every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <>
      {isVisible && (
        <Box
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create Your Shop
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Set up your online store now and start selling products.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => alert('Create Shop clicked!')}
              >
                Create Shop
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default CreateShopPopup;
