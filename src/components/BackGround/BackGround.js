import React from 'react';
import { Box, Typography } from '@mui/material';
import BgImage from '../../images/bazaar.png'



const BackGround = () => {
  const backgroundStyle = {
    backgroundImage: `url(${BgImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '20px',
  };

  const overlayStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    clipPath: 'ellipse(100% 85% at 50% 100%)',
  };

  return (
    <Box>
    <Box sx={backgroundStyle}>
      <Box sx={overlayStyle}>
        <Typography variant="h2" component="h1" gutterBottom sx={{fontWeight:'bold', fontSize:'30px', color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontStyle:'italic' }}>
        Whatever it is. PkBazaar it.
        </Typography>
      </Box>
    </Box>
   
    </Box>
  );
};

export default BackGround;
