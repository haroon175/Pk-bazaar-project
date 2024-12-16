import React from 'react';
import { Box, Grid } from '@mui/material';



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

const Category = () => {
    return (
        <Box sx={{ marginTop: '70px', marginBottom: '70px' }}>           
            <Grid container spacing={6}>
                {categories.map((category, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Box
                            sx={{
                                width: '128px',
                                height: '128px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor:'pointer',  
                                marginTop:'-30px',                                                              
                                position: 'relative',
                                '&:hover::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(0px)', 
                                    zIndex: 1,
                                }
                            }}
                        >
                            <img
                                src={category.img}
                                alt={`Category ${index + 1}`}
                                style={{ height: '100%', width: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }}
                            />
                        </Box>

                    </Grid>
                ))}
            </Grid>
            <hr/>
        </Box>
    );
};

export default Category;
