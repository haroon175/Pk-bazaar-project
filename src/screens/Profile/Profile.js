import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbars from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import EditProfileModal from "./EditProfileModal";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate
  const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';

  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    const savedProfile = localStorage.getItem("profileData");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    } else {
      setAvatar("https://via.placeholder.com/120");
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${NGROK_URL}/v1.0/user/get_profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.user;
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            bio: data.user_role,
            avatar: data.avatar || "https://via.placeholder.com/120",
          });
          localStorage.setItem("profileData", JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            bio: data.user_role,
            avatar: data.avatar || "https://via.placeholder.com/120",
          }));
          localStorage.setItem("profileAvatar", data.avatar || "https://via.placeholder.com/120");
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setAvatar(imageData);
        localStorage.setItem("profileAvatar", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("profileData", JSON.stringify(updatedProfile));
    localStorage.setItem("profileAvatar", updatedProfile.avatar || avatar);
  };

  const handleLogout = () => {
    localStorage.removeItem("profileData");
    localStorage.removeItem("profileAvatar");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <Navbars />
      <Box sx={{ padding: 3, marginTop: "80px" }}>
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', textShadow: 3, marginBottom: '20px' }}>
          Welcome to the <span style={{ color: '#f85606', fontWeight: 'bold' }}>Pk</span>
          <span style={{ color: '#f85606', fontWeight: 'bold' }}>Bazaar</span> and Manage Your Profile
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Paper
            sx={{
              padding: 3,
              backgroundColor: 'white',
              width: '600px',
              boxShadow: 5,
              borderRadius: '20px',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} container justifyContent="center" alignItems="flex-start">
                <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt="User Avatar"
                    src={avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid #f85606",
                      boxShadow: 5,
                    }}
                  />
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{
                      position: "relative",
                      bottom: 35,
                      right: -35,
                      backgroundColor: "white",
                      boxShadow: 1,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <PhotoCameraIcon sx={{ color: "#f85606" }} />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ color: "#333", fontWeight: "bold", fontStyle: "italic" }}>
                    {profile.first_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: 1,
                      color: "#555",
                      textAlign: "center",
                      maxWidth: 200,
                      fontSize: "0.875rem",
                      fontStyle: "italic",
                    }}
                  >
                    🎉 Welcome to PkBazaar 🎉 Your one-stop destination for quality products and amazing 🛒 deals! 🛒
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Profile Details
                </Typography>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'medium', mr: 1 }}>
                    <PersonIcon sx={{ color: '#f85606' }} />
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }}>
                    {profile.first_name} {profile.last_name}
                  </Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'medium', mr: 1 }}>
                    <MailIcon sx={{ color: '#f85606' }} />
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }} >
                    {profile.email}
                  </Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'medium', mr: 1 }}>
                    <InfoIcon sx={{ color: '#f85606' }} />
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'black', fontStyle: 'italic' }} >
                    {profile.bio}
                  </Typography>
                </Box>
                <hr />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ color: '#f85606', borderColor: '#f85606' }}
                    onClick={handleModalOpen}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#f85606' }}
                    onClick={handleLogout} // Add the logout handler
                  >
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
      <Footer />
      <EditProfileModal open={openModal} handleClose={handleModalClose} profile={profile} handleSave={handleProfileSave} />
    </div>
  );
};

export default Profile;
