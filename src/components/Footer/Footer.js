import React from 'react';
import { Grid, Typography, Link, Container, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Use a relevant icon or import SVG
import AppleIcon from '@mui/icons-material/Apple';
function Footer() {
    return (
        <footer style={{ backgroundColor: '#fff', padding: '40px 0', width: '100%' }}>
            <hr></hr>
            <Container sx={{ width: '100%' }}>
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Column 1 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', }}>
                            GET THE APP
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<GoogleIcon />}
                            href="https://play.google.com/store"
                            sx={{ marginTop: 1, width: '70%', justifyContent: 'flex-start', backgroundColor: '#00224D' }}
                        >
                            Get it on <br />Google Play
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<AppleIcon />}
                            href="https://www.apple.com/app-store/"
                            sx={{
                                marginTop: 1,
                                width: '70%',
                                justifyContent: 'flex-start',
                                backgroundColor: '#f85606',
                                // '&:hover': {
                                //     backgroundColor: '#f85606', // Change background color on hover
                                // },
                            }}
                        >
                            Download on the App Store
                        </Button>


                        <Link href="#" color="inherit" underline="none" sx={{ display: 'block', marginTop: 2 }}>
                            More about our apps
                        </Link>
                    </Grid>

                    {/* Column 2 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            PkBAZAAR
                        </Typography>
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 2, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            PkBazaar+ for professionals
                        </Link>
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 2, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Careers
                        </Link>
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 2, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Help Center
                        </Link>
                    </Grid>


                    {/* Column 3 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            LEGAL
                        </Typography>
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 2, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Contact
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 1, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Terms & Conditions
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 1, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Buyer protection
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 1, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Privacy Policy
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 1, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Cookie Policy
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none" sx={{
                            mt: 1, display: 'block', fontWeight: 'semi-bold', fontSize: '15px', "&:hover": {
                                color: 'gray',
                            },
                        }}>
                            Manage your privacy consent
                        </Link>
                    </Grid>

                    {/* Column 4 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                marginLeft: '80px',
                                fontFamily: 'Orbitron',
                                fontWeight: 'bold',
                                fontSize: '30px',
                                // background: 'linear-gradient(50deg, #f85606 30%, #f85606 30%, #f85606 60%)',
                                // WebkitBackgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',

                            }}
                        >
                            <span style={{ color: '#f85606' }}>Pk</span><span style={{ color: '#00224D' }}>Bazaar</span>
                        </Typography>
                        <Typography sx={{ color: 'gray' }}>
                            &copy; finderly GmbH & Co KG 2024
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <hr style={{ marginTop: '30px' }}></hr>
        </footer>
    );
}

export default Footer;
