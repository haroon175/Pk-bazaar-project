import React from "react";
import { Card, CardContent, Typography, Grid, Avatar, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const testimonials = [
  {
    name: "Qammar Ashfaq",
    image: 'https://ca.slack-edge.com/T07LSHX9Z17-U07KZBDV6QP-adbe44984229-192',
    feedback: "PkBazaar is fantastic! The service is excellent, and I found everything I needed.",
    position: "CEO, Tech Solutions",
  },
  {
    name: "Zain Amir",
    image: 'https://media-mct1-2.cdn.whatsapp.net/v/t61.24694-24/418607524_1619487638867180_1809172902641453310_n.jpg?ccb=11-4&oh=01_Q5AaIIzvE_3C0sQrdpsCjybW6pu11mxWkyhvJeUnQ6SkRwW2&oe=67526701&_nc_sid=5e03e0&_nc_cat=100',
    feedback: "Shopping at PkBazaar was a breeze. Great products and quick delivery!",
    position: "Marketing Manager, Innovate Co.",
  },
  {
    name: "Umair Younas",
    image: 'https://media-mct1-2.cdn.whatsapp.net/v/t61.24694-24/431009271_979444743640051_5232978654029614817_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIIGRFsMFHatZ1DPD-5LqO-PthzC_HncPvMvbhkwdnsEo&oe=675294A9&_nc_sid=5e03e0&_nc_cat=110',
    feedback: "PkBazaar provides the best online shopping experience in Pakistan. Highly recommended!",
    position: "Entrepreneur",
  },
];


const animateBackground = keyframes`
  from {
    background-position: 0%;
  }
  to {
    background-position: 100%;
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  position: "relative",
  overflow: "hidden",
  boxShadow: theme.shadows[5],
  borderRadius: "15px",
  transition: "all 0.4s ease",
  cursor: "pointer",
  background: "linear-gradient(to right, #f85606 50%, white 50%)",
  backgroundSize: "200%",
  backgroundPosition: "right",
  "&:hover": {
    backgroundPosition: "left",
    color: "white",
    "& *": {
      color: "white", 
    },
  },
}));

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontSize: "30px",
          marginBottom: "50px",
          textAlign: "center",          
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
         <span style={{color:'#f85606'}}>█▓▒▒░░░</span>What Our Customers Say<span style={{color:'#f85606'}}>░░░▒▒▓█</span>
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 16px",
                    border: "2px solid #f85606",
                  }}
                />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  "{testimonial.feedback}"
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {testimonial.position}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
