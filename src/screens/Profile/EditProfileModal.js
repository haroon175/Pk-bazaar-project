import React, { useState, useEffect } from "react";
import Edit from '../../images/edit.png'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    Typography,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfileModal = ({ open, handleClose, profile, handleSave }) => {
    const [formValues, setFormValues] = useState(profile);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';

    useEffect(() => {
        setFormValues(profile);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please log in again.");
                setLoading(false);
                toast.error("No token found. Please log in again.");
                return;
            }

            const response = await axios.put(
                `${NGROK_URL}/v1.0/user/update_profile`,
                {
                    id: formValues.id,
                    first_name: formValues.first_name,
                    last_name: formValues.last_name,
                    email: formValues.email,
                    user_role: formValues.user_role,
                    avatar: formValues.avatar,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                handleSave(formValues);
                setTimeout(() => {
                    handleClose();
                }, 1000);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                },
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar alt="Profile Image" src={Edit} sx={{ width: 80, height: 80, mb: 1, border:'5px solid #f85606' }} />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#f85606', textAlign: 'center' }}
                    >
                        Edit Profile
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                    {error && <Box color="red">{error}</Box>}
                    <Box display="flex" gap={2}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderRadius: "18px",
                            }}
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderRadius: "8px", // Border radius for the input
                            }}
                        />
                    </Box>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderRadius: "8px", // Border radius for the input
                        }}
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        value={formValues.bio}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled
                        sx={{
                            borderRadius: "8px", // Border radius for the input
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{marginBottom:'20px'}}>
                <Button
                    onClick={handleClose}
                    sx={{
                        borderColor: '#f85606',
                        color: '#f85606',
                        borderRadius: "8px", 
                    }}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleFormSubmit}
                    sx={{
                        backgroundColor: '#f85606',
                        borderRadius: "8px", 
                    }}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
            <ToastContainer />
        </Dialog>
    );
};

export default EditProfileModal;
