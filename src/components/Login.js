import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, CircularProgress, Divider, Grid, Card, CardContent } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import loginBg from '../images/login.jpg'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .length(6, 'Password must be exactly 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${NGROK_URL}/v1.0/user/login`, values);

                if (response.data.user && response.data.token) {
                    // Store token in local storage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.user.id);

                    toast.success(response.data.message || 'Login successful!');
                    setTimeout(() => {
                        navigate('/eg');
                    }, 1000);
                } else {
                    toast.error('Login failed. Please try again.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
                navigate('/');
            }
        },
    });

    return (
        <Box
            // display="flex"
            // alignItems="center"
            // justifyContent="center"
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:'url(https://png.pngtree.com/thumb_back/fh260/back_our/20190614/ourmid/pngtree-happy-shopping-light-spot-poster-background-image_122448.jpg)', // Replace with your desired image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <Card sx={{ display: 'flex', width: { xs: '100%', sm: '70%', md: '50%' }, borderRadius: 2, boxShadow: 3 }}>
                <Grid container>
                    {/* Left side - Form */}
                    <Grid item xs={12} sm={6}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    mt: '-20px',
                                    
                                    mb: 0.5,
                                    textAlign: 'center',
                                    // background: 'linear-gradient(50deg, #f85606 38%, #f85606 40%, #f85606 60%)',
                                    // WebkitBackgroundClip: 'text',
                                    // WebkitTextFillColor: 'transparent',
                                }}
                            >
                                
                                <span style={{ color: '#f85606'}}>Pk</span><span style={{ color: '#00224D' }}>Bazaar</span>
                            </Typography>

                            <Typography variant="h5" align="center" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                Welcome to PkBazaar desktop
                            </Typography>

                            <Box
                                sx={{ mt: 2 }}
                                component="form"
                                display="flex"
                                flexDirection="column"
                                onSubmit={formik.handleSubmit}
                            >
                                <TextField
                                id="standard-basic"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#10375C', 
                                        },
                                        '& .MuiInput-underline:before': {
                                            borderBottomColor: '#10375C', 
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#10375C', 
                                        },
                                    }}
                                />
                                <TextField
                                id="standard-basic"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleTogglePasswordVisibility} sx={{ color: '#f85606' }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#10375C', 
                                        },
                                        '& .MuiInput-underline:before': {
                                            borderBottomColor: '#10375C', 
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#10375C', 
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty)} // Disable if form is not valid or not dirty
                                    sx={{ mt: 2, backgroundColor: '#f85606' }}
                                >
                                    {formik.isSubmitting ? <CircularProgress size={24} /> : 'Log In'}
                                </Button>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Button variant="outlined" color="inherit" startIcon={<GoogleIcon />} fullWidth sx={{
                                color: '#00224D',
                                borderColor: '#00224D',
                                width: '100%',
                                fontSize: '12px',
                                height: '40px',
                                '&:hover': {
                                    backgroundColor: '#00224D',
                                    color: 'white'
                                }
                            }}>
                                Continue with Google
                            </Button>

                            <Box textAlign="center" mt={2}>
                                <Typography variant="body2">
                                    Don’t have an account?{' '}
                                    <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none', p: 0 }}>
                                        Sign Up
                                    </Button>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Grid>

                    {/* Right side - Image */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundImage: `url(${loginBg})`, // Replace with your image URL
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '0 8px 8px 0'
                            }}
                        />
                    </Grid>

                </Grid>
            </Card>
        </Box>
    );
}
