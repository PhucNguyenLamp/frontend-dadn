import { Button, Box, Typography, Input, Container, Paper } from "@mui/material";
import { PostAdd } from "@mui/icons-material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import api from "../../api/axios";

export default function Admin() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles[0]);
    console.log(acceptedFiles[0])
    // upload file to backend
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('thumbnail', files);
    formData.append('title', title);
    formData.append('likeNum', '0');
    api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }
  const handleGetAll = () => {
    api.get("/getall").then((res) => {
      setImage(res.data.thumbnail);

    }).catch((err) => {
      console.log(err);
    });
  };
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} sx={{ mt: 2}}>
              <input {...getInputProps()} />
              <Button variant="contained" color="primary" size="large">
                Tải File
              </Button>
            </Box>
          )}
        </Dropzone> 
        <Box
          sx={{
            // flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "500px",
            height: "200px",
          }}
        >
        { files.length == 0 ? 
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  p: 3,
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <input {...getInputProps()} />
                <PostAdd fontSize="large" color="primary" />
                <Typography variant="body2" color="textSecondary">
                  Hoặc kéo thả file vào đây
                </Typography>
              </Box>
            )}
          </Dropzone>
        :
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5">File đã chọn</Typography>
            <Typography>{files.name}</Typography>
            <Typography>{files.size/1000000} MB</Typography>
            {/* center the image */}
            <img src={URL.createObjectURL(files)} style={{
              margin: 'auto',
              width: 'auto',
              height: '400px'
              }}  />
          </Paper>
          }
        </Box>
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <Button sx={{ mt: 2}} variant="outlined" onClick={handleUpload}>SEND</Button>
        <Button sx={{ mt: 1}} variant="outlined" onClick={handleGetAll}>GET ALL</Button>
        <img src={image}></img>
      </Box>
  );
}
