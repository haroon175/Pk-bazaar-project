import React, { useState } from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Navbars from '../Navbar/Navbar';

const categories = [
  { img: 'https://m1.secondhandapp.at/2.0/638efd08afec5103ce0ebe58?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/638efda7e8b7f364fd6625c2?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b7b61325443e0a42481c?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b7dcbd86fa6d91283ee3?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b7ffc2d78c37515045ff?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b820c876600b92054225?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b9172fa42a67444a0841?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b93f94712e46684ad304?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b837687ba942291d16dd?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b8ffb69ea54f852d4954?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/660fe741af2e1a1d0103a3c2?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b88a01d1284c0954cf86?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b8b2a5378b18d3575dbf?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b8ce10b11b290e3d1f44?height=128&width=128' },
  { img: 'https://m1.secondhandapp.at/2.0/61c1b8e7a1de3d0355476717?height=128&width=128' },
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Calculate the items to be displayed on the current page
  const currentCategories = categories.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box>
     <Navbars/>    
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>  
          
      <Box sx={{ padding: 2 , marginTop:'100px'}}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          Sell & buy - easy & fast
        </Typography>
        <span style={{ float: 'left' }}>Check out our top selling items on the app:</span>
        
        {/* Buttons container */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 8 }}>
          <Button variant="outlined" sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }}>
            Sofa
          </Button>
          <Button variant="outlined" sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }}>
            iPhone
          </Button>
          <Button variant="outlined" sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }}>
            Bike
          </Button>
          <Button variant="outlined" sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }}>
            TV
          </Button>
          <Button variant="outlined" sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }}>
            Wardrobe
          </Button>
        </Box>
      </Box>

      {/* Categories display */}
      <Box sx={{ marginTop: 2 }}>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {currentCategories.map((category, index) => (
            <Box key={index} sx={{ width: '128px', height: '128px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={category.img} alt={`Category ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>

        {/* Pagination buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
          <Button 
            variant="outlined" 
            sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }} 
            onClick={handlePrevious} 
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button 
            variant="outlined" 
            sx={{ borderRadius: '20px', color: '#6C22A6', borderColor: '#FE7A36', fontWeight: 'bold' }} 
            onClick={handleNext} 
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default Home;
