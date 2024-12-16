import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Navbars from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import UpdateCategory from "./UpdateCategory";
import { toast, ToastContainer } from "react-toastify";
import CreateCategoryModal from "./CreateCategoryModal";

const SubCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryData } = location.state || {};
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const NGROK_URL = "https://organization-gibson-explorer-intended.trycloudflare.com/api";

  // Load deleted categories from localStorage
  useEffect(() => {
    const deletedCategories = JSON.parse(localStorage.getItem("deletedCategories")) || [];
    setCategories(
      categoryData?.children?.filter((category) => !deletedCategories.includes(category.id)) || []
    );
  }, [categoryData]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  const handleClick = () =>{
    navigate(`/products/${categoryData.id}`)
  }

  const handleUpdateSuccess = (updatedCategory) => {  
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );

    // Save updated categories to localStorage
    localStorage.setItem("categories", JSON.stringify(categories));
  };


  const handleMenuClick = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentCategoryId(null);
  };

  const handleUpdateCategory = () => {
    const selectedCategory = categories.find((category) => category.id === currentCategoryId);
    setSelectedCategory(selectedCategory);
    setOpenUpdateDialog(true);
    handleMenuClose();
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authorization token found. Please log in.");
      }

      const response = await fetch(
        `${NGROK_URL}/v1.0/category/deleteCategory/${currentCategoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Add deleted category ID to localStorage
      const deletedCategories =
        JSON.parse(localStorage.getItem("deletedCategories")) || [];
      deletedCategories.push(currentCategoryId);
      localStorage.setItem("deletedCategories", JSON.stringify(deletedCategories));

      // Remove deleted category from state
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== currentCategoryId)
      );

      const deletedCategory = categories.find((category) => category.id === currentCategoryId);
      toast.success(`Category ${deletedCategory?.name || ""} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "Failed to delete category. Please try again.");
    } finally {
      handleMenuClose();
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <div>
      <Navbars />
      <Box sx={{ marginTop: "70px" }}>
        {/* <Carousel /> */}
        <Container>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginTop: "60px", marginLeft: "20px", color: "#00224D" }}
          >
            {categoryData.name}
          </Typography>
          <Card sx={{ maxWidth: 345, margin: 2, backgroundColor: 'whitesmoke', boxShadow: 3 }} onClick={handleClick}>
            <CardMedia
              component="img"
              height="140"
              image={categoryData.image}
              alt={categoryData.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {categoryData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {categoryData.description}
              </Typography>
            </CardContent>
          </Card>
          <hr />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginTop: "20px", marginLeft: "20px", color: "#00224D" }}
          >
            Others
          </Typography>
          {categories.length > 0 ? (
            <Grid container spacing={3} style={{ padding: "20px" }}>
              {categories.map((child) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={child.id}>
                  <Card sx={{ marginTop: "-10px", position: "relative", backgroundColor: 'whitesmoke', boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={child.image}
                      alt={child.name}
                    />
                    <CardContent
                      onClick={() => handleCategoryClick(child.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {child.name}
                      </Typography>
                    </CardContent>
                    <IconButton
                      onClick={(event) => handleMenuClick(event, child.id)}
                      sx={{ position: "absolute", top: 10, right: 10 }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Card>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && currentCategoryId === child.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleUpdateCategory}>Update</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" color="textSecondary">
              No children available for this category.
            </Typography>
          )}
        </Container>

        <CreateCategoryModal
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          categoryData={selectedCategory}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </Box>
      <ToastContainer />
      {/* <Footer /> */}
    </div>
  );
};

export default SubCategory;
