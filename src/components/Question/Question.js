import React from 'react';
import { Box, Typography } from '@mui/material';
import Users from '../Users/Users';
import Testimonials from '../Testimonials/Testimonials';

function Question() {
  return (
    <Box>
        <Users/>
      <Testimonials/>
      <Typography variant="h6" gutterBottom textAlign="left" sx={{fontWeight:'bold', marginTop:'30px', color:'#00224D'}}>
        What is PkBazaar?
      </Typography>
      <Typography variant="body1" textAlign="left">
        PkBazaar is a marketplace and classifieds platform that brings millions of private buyers and sellers across the United Kingdom together - London, Brighton, Birmingham, Bristol, Manchester, Leicester, and Liverpool are amongst the most active areas for second-hand shopping. You can buy & sell beautiful used & new things in various categories which range from electronics, fashion, items for babies as well as children, and furniture for home & garden to specialised interests such as cars and property.
      </Typography>
    </Box>
  );
}

export default Question;
