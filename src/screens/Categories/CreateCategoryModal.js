import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CreateCategory from "../../images/category.png";
import { ToastContainer, toast } from "react-toastify";

const CreateCategoryModal = ({ open, onClose, categoryData, onUpdateSuccess }) => {
  const NGROK_URL = "https://organization-gibson-explorer-intended.trycloudflare.com/api";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    parentId: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [fetchingParents, setFetchingParents] = useState(false);

  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name || "",
        description: categoryData.description || "",
        image: categoryData.image || "",
        parentId: categoryData.parentId || "",
      });
      setImagePreview(categoryData.image || null);
    }
  }, [categoryData]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImagePreview(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleImageUpload = async (file) => {
    setUploading(true);

    try {
      const uploadPayload = new FormData();
      uploadPayload.append("image", file);

      const response = await axios.post(
        `${NGROK_URL}/v1.0/aws/upload/upload`,
        uploadPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.imageUrl) {
        const imageUrl = response.data.imageUrl;
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: imageUrl,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Image URL not returned from the server.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchParentCategories = async () => {
    setFetchingParents(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(`${NGROK_URL}/v1.0/category/subcategories`, {
        headers,
      });

      if (response.data && response.data.topLevelCategories) {
        setParentCategories(response.data.topLevelCategories);
        toast.success("Parent categories fetched successfully.");
      } else {
        throw new Error("Invalid response structure.");
      }
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      toast.error("Failed to fetch parent categories.");
    } finally {
      setFetchingParents(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const payload = {
        name: formData.name,
        description: formData.description,
        image: formData.image || "",
        parentId: formData.parentId ? parseInt(formData.parentId, 10) : null,
      };
  
      const isUpdating = !!categoryData;
      const endpoint = isUpdating
        ? `${NGROK_URL}/v1.0/category/updateCategory/${categoryData.id}`
        : `${NGROK_URL}/v1.0/category/create`;
  
      const response = await axios({
        method: isUpdating ? "PUT" : "POST",
        url: endpoint,
        headers,
        data: payload,
      });
  
      if (response.status === 200 && response.data) {
        const updatedCategory = response.data;
  
        toast.success(
          `Category "${updatedCategory.name}" ${isUpdating ? "updated" : "created"} successfully!`,
          { autoClose: 3000 }
        );
  
        onUpdateSuccess && onUpdateSuccess(updatedCategory);
  
        setFormData({ name: "", description: "", image: "", parentId: "" });
        setImagePreview(null);
        onClose();
      } else {
        throw new Error(
          `Failed to ${isUpdating ? "update" : "create"} category.`
        );
      }
    } catch (error) {
      console.error(`Error ${categoryData ? "updating" : "creating"} category:`, error);
      toast.error(
        `Failed to ${categoryData ? "update" : "create"} category. Please try again.`
      );
    } finally {
      setLoading(false);
    }
};

  





  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar alt="Category Image" src={CreateCategory} sx={{ width: 80, height: 80 }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", fontSize: "1rem", color: "#f85606", textAlign: "center" }}
          >
            {categoryData ? "Update Category" : "Create Category"}
          </Typography>
        </Box>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={1}
            />
            <FormControl fullWidth sx={{ mt: '5px' }}>
              <InputLabel id="parent-category-label">Parent Category</InputLabel>
              <Select
                labelId="parent-category-label"
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                onOpen={fetchParentCategories}
                disabled={fetchingParents}
              >
                {parentCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              {...getRootProps()}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: "2px dashed #f85606",
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragActive ? "#f9f9f9" : "transparent",
              }}
            >
              <input {...getInputProps()} />
              <Button
                variant="contained"
               
                onClick={() => document.querySelector('input[type="file"]').click()}
                sx={{backgroundColor:'#f85606'}}
              >
                Upload Image
              </Button>
              <span style={{textAlign:'center', marginLeft:'3px'}}>or</span>
              <Typography sx={{ flex: 1, textAlign: "center" }}>
                {isDragActive ? "Drop the file here..." : "Drag & drop an image click to select"}
              </Typography>
              
            </Box>

            {imagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "180px" }} />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ color: "#00224D", borderColor: "#00224D" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f85606" }}
            onClick={handleSubmit}
            disabled={loading || uploading}
          >
            {loading ? <CircularProgress size={24} /> : categoryData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Box>
      <ToastContainer />
    </Dialog>
  );
};

export default CreateCategoryModal;
