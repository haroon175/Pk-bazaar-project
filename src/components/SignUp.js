import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    InputAdornment,
    Divider,
    Grid,
    Card,
    FormControl,
    CardContent,
    Select,
    MenuItem,
    InputLabel,
    LinearProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string()
        .length(6, 'Password must be exactly 6 characters')
        .required('Password is required'),
    user_role: Yup.string().required('Role is required'),
});

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const NGROK_URL = 'https://organization-gibson-explorer-intended.trycloudflare.com/api';

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            user_role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`${NGROK_URL}/v1.0/user/signup`, values);
                if (response.data.message === 'User created successfully') {
                    toast.success('Sign up successful!');
                    resetForm();
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    if (error.response.data.message === 'User already exists') {
                        toast.error('User already exists!');
                    } else {
                        toast.error('Error during sign up. Please try again.');
                    }
                } else {
                    toast.error('An unexpected error occurred.');
                }
            }
        },
    });

    const calculateProgress = () => {
        let filledFields = 0;
        const fields = ['first_name', 'last_name', 'email', 'password', 'user_role'];
        fields.forEach((field) => {
            if (formik.values[field]) filledFields += 1;
        });
        return (filledFields / fields.length) * 100;
    };

    const google = () => {
        window.open(`${NGROK_URL}/v1.0/user/google/auth/google`, '_self');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage:
                    'url(https://png.pngtree.com/thumb_back/fh260/back_our/20190614/ourmid/pngtree-happy-shopping-light-spot-poster-background-image_122448.jpg)',
            }}
        >
            <ToastContainer position="top-right" autoClose={3000} />
            <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 5, padding: 4 , borderRadius:'20px'}}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        <span style={{ color: '#f85606' }}>Pk</span>
                        <span style={{ color: '#00224D' }}>Bazaar</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                        Welcome to PkBazaar desktop
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={1}>
                        {[...Array(5)].map((_, index) => (
                            <Grid item xs key={index}>
                                <LinearProgress
                                    variant="determinate"
                                    value={calculateProgress()}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#ddd',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#f85606',
                                        },
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, color:'grey' }}/>
                            <TextField
                                label="First Name"
                                variant="standard"
                                fullWidth
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonOutlineIcon sx={{ mr: 1, color:'grey' }}/>
                            <TextField
                                label="Last Name"
                                variant="standard"
                                fullWidth
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MailIcon sx={{ mr: 1, color:'grey' }} />
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LockIcon sx={{ mr: 1 , color:'grey'}}/>
                            <TextField
                                label="Password"
                                variant="standard"
                                fullWidth
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-select-label">Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    value={formik.values.user_role}
                                    name="user_role"
                                    onChange={formik.handleChange}
                                    error={formik.touched.user_role && Boolean(formik.errors.user_role)}
                                >
                                    <MenuItem value="USER">User</MenuItem>
                                    <MenuItem value="VENDOR">Vendor</MenuItem>
                                    <MenuItem value="ADMIN">Admin</MenuItem>
                                </Select>
                                {formik.touched.user_role && formik.errors.user_role && (
                                    <Typography color="error" variant="caption">
                                        {formik.errors.user_role}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: '#f85606' }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Sign Up
                    </Button>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{
                            color: '#00224D',
                            borderColor: '#00224D',
                            width: '100%',
                            fontSize: '12px',
                            height: '40px',
                            '&:hover': {
                                backgroundColor: '#00224D',
                                color: 'white',
                            },
                        }}
                        onClick={google}
                    >
                        Continue with Google
                    </Button>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Already have an account?{' '}
                        <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none', p: 0 }}>
                            Log in
                        </Button>
                    </Typography>
                </Box>

            </Card>
        </Box>
    );
}
