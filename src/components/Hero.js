import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Question from './Question/Question';
import Category from './Category/Category';
import Carousel from './Carousel/Carousel';
import HomeCategory from './Category/HomeCategory';

const Hero = () => {
  return (
    <Box>
      <Carousel />
      <Container >
        <Typography variant="h4" component="h2" gutterBottom sx={{ marginTop: '35px', fontWeight: 'bold', fontSize: '30px', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
       <span style={{color:'#f85606'}}>█▓▒▒░░░</span>Buy & sell your Products in marketplace<span style={{color:'#f85606'}}>░░░▒▒▓█</span>
        </Typography>   

        <HomeCategory />
        <Category />
        <Question />       
      </Container>
    </Box>
  );
};

export default Hero;
