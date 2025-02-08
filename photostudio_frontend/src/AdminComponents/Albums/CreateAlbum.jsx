import { TextField, Button, Box, Typography, Grid2, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React, { useState } from 'react'
import {  CircularProgress, Grid, IconButton } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close'; 
import { api } from '../../usercomponents/config/api';
import { useLocation, useNavigate } from 'react-router-dom';

export const CreateAlbum = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);
  const [publish,setPublish] =useState(false);
  const [uploading, setUploading] = useState(false);
  const bookingId = location.state?.bookingId;
  const jwt = localStorage.getItem("jwt");
  const UPLOAD_PRESET ="studio"
  const CLOUD_NAME ="days1tblx"

  // Handle file upload to Cloudinary
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const uploadedImages = [];

    setUploading(true);

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImages((prev) => [...prev, ...uploadedImages]);
    setUploading(false);
  };

  const handleRemoveImage=(index)=>{
    setImages(images.filter((_, i) => i !== index));
  
  }
  
  const handleCreateAlbum = async () => {
    if (!albumName || images.length === 0) {
      alert("Please provide an album name and upload at least one image.");
      return;
    }

    const albumData = {
      albumName,
      images, // Array of Cloudinary URLs
      publish,
    };

    try {
      
      await api.post(`/admin/booking/${bookingId}/album/addAlbum`, albumData,{
                      headers:{
                          Authorization:`Bearer ${jwt}`,
                      },
                  });
      alert("Album created successfully!");
      navigate(`/admin/client-albums`);
      setAlbumName("");
      setImages([]);
      setPublish(false);
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"  // Full height of the viewport
    >
        <Box p={4} 
            boxShadow={3} 
            borderRadius={2} 
            bgcolor="#656665" 
            width="400px"  // Set a fixed width for better alignment
            >
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
              Create New Album
            </Typography>

            <TextField
              fullWidth
              label="Album Name"
              variant="outlined"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              component="label"
              disabled={uploading}
              sx={{ mb: 2 }}
            >
              {uploading ? "Uploading..." : "Upload Images"}
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>

            <Grid2 container spacing={2} mt={2}>
              {images.map((url, index) => (
                <Grid2 item xs={4} key={index} className='relative'>
                  <img className='w-24 h-24 object-cover'
                    src={url}
                    alt={`Uploaded ${index}`}
                    
                  />
                  <IconButton size='small' sx={{
                                position:"absolute",
                                top:0,
                                right:0,
                                outline:"none"
                            }} onClick={()=>handleRemoveImage(index)}>
                                <CloseIcon sx={{fontSize:"1rem"}}/>
                              </IconButton>
                </Grid2>
              ))}
            </Grid2>


              {/* Publish Option */}
               <FormLabel component="legend" sx={{ mt: 3, fontWeight: "bold", fontSize: "16px" }}>
                  Publish Album
                </FormLabel>
                <RadioGroup
                  row
                  value={publish}
                  onChange={(e) => setPublish(e.target.value === "true")}
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        sx={{
                          color: "gray", // Default color
                          "&.Mui-checked": {
                            color: "green", // Color when selected
                          },
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      fontWeight: publish === true ? "bold" : "normal",
                      color: publish === true ? "green" : "black",
                    }}
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        sx={{
                          color: "gray", // Default color
                          "&.Mui-checked": {
                            color: "red", // Color when selected
                          },
                        }}
                      />
                    }
                    label="No"
                    sx={{
                      fontWeight: publish === false ? "bold" : "normal",
                      color: publish === false ? "red" : "black",
                    }}
                  />
                </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAlbum}
              sx={{ mt: 3 }}
            >
              Create Album
            </Button>
      </Box>
  </Box>

  )
}
