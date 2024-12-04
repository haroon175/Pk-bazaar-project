import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Footer from './Footer/Footer';
import Question from './Question/Question';
import BackGround from './BackGround/BackGround';
import Category from './Category/Category';
import Carousel from './Carousel/Carousel';
import HomeCategory from './Category/HomeCategory';

const Hero = () => {
  return (
    <Box>
    <Carousel/>
    <Container >
      <Typography variant="h4" component="h2" gutterBottom sx={{marginTop:'35px', fontWeight:'bold', fontSize:'30px', textAlign:'center',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        Buy & sell on your local second-hand classifieds marketplace
      </Typography>
      <Typography sx={{fontSize:'16px', fontWeight:'bold', textAlign:'center',marginTop:'15px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',  }}>
      Discover one of the largest marketplaces for buyers and sellers nearby
      </Typography>
      <HomeCategory/>
      <Category/>
      <BackGround/>
      <Question/>
      <Footer/>
    </Container>
    </Box>
  );
};

export default Hero;
