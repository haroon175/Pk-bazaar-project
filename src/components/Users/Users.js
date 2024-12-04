import React from "react";
import { Grid, Card, CardContent, Typography, Rating, Box } from "@mui/material";
import styled from "@emotion/styled";
import StarIcon from '@mui/icons-material/Star';



const reviews = [
    {
        name: "App Store Review",
        review: "One of the best apps for buying and selling. One of the best apps - love the way it works and connects those who have with those that need - very fast and easy to use top marks",
    },
    {
        name: "App Store Review",
        review: "Great app, so easy to use. Free service too… get your items sold fast & free, no sales commission…",
    },
    {
        name: "Andrea Snazzy - Dame APB · App Store Review",
        review: "Gives you a clear process of communicating with the buyer and it’s got some fabulous bargains and you can do this all for free.",
    },
    {
        name: "Linda Higley · Google Play Review",
        review: "I use it regularly and highly recommend it to all my family and friends.",
    },
    {
        name: "Andrew Ahad · Google Play Review",
        review: "Also a lot of great items for sale. App works very well. PkBazaar has started a delivery service which is doing well.",
    },
    {
        name: "Sophie Palmer · Google Play Review",
        review: "Amazing because everything gets sold so fast.",
    },
];

const GreenRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#f85606',

    },
    '& .MuiRating-iconEmpty': {
        color: '#f85606',
        float: 'left'
    },
});

function Users() {
    return (
        <Box>

            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    marginTop: '50px',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    marginBottom: '30px',
                    textAlign: 'center',                    
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                }}
            >
                See what PkBazaar users are saying
            </Typography>
              
            <Grid container spacing={3}>

                {reviews.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ border: '1px solid #00224D', borderRadius: '10px', boxShadow:5 }}>
                            <CardContent>
                                <Typography variant="body2" textAlign='left' sx={{ color: 'black', fontSize: '15px' }}>
                                    &quot;{item.review}&quot;
                                </Typography>
                                <GreenRating
                                    name="rating"
                                    value={item.rating}
                                    precision={0.5}
                                    readOnly
                                    icon={<StarIcon fontSize="inherit" />}
                                    emptyIcon={<StarIcon fontSize="inherit" />}
                                    sx={{ my: 1, display: 'flex', justifyContent: 'flex-start' }}
                                />

                                <Typography variant="h6" component="div" textAlign='left' sx={{ fontWeight: 'bold', fontSize: '15px', }}>
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Users;
