import {
  Grid,
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import {
  Image,
  Title,
  Description,
  Code,
  Save,
  Publish,
  Upload,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CLOUDINARY_URL, UPLOAD_PRESET } from "../../service/Cloudinary";
import axios from "axios";

function NewBlogForm({
  formData,
  setFormData,
  handleChange,
  createBlogMutation,
  isFormValid,
}: any) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post(CLOUDINARY_URL, formDataUpload, {
        onUploadProgress: (e) => {
          const percent = Math.round(e.loaded * 100);
          setProgress(percent);
        },
      });

      const imageURL = res.data.secure_url;
      setFormData((prev: any) => ({
        ...prev,
        featuredImage: imageURL,
      }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 1,
            bgcolor: "white",
            border: "1px solid",
            borderColor: "grey.100",
            height: "fit-content",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Blog Details
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Featured Image"
              name="featuredImage"
              fullWidth
              value={formData.featuredImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton component="label">
                        <Upload />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            {uploading && (
              <Box sx={{ mt: 1 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            )}

            {formData.featuredImage && (
              <Box
                component="img"
                src={formData.featuredImage}
                alt="Featured preview"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            <TextField
              label="Blog Title"
              name="title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title for your blog"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <TextField
              label="Synopsis"
              name="synopsis"
              fullWidth
              multiline
              rows={3}
              required
              value={formData.synopsis}
              onChange={handleChange}
              placeholder="Write a compelling summary of your blog post"
              helperText="This will be displayed in blog previews and search results"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 2 }}
                    >
                      <Description color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Content
              </Typography>
              <TextField
                name="content"
                fullWidth
                multiline
                rows={15}
                required
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content using Markdown syntax..."
                helperText="Supports Markdown formatting: **bold**, *italic*, # headers, ```code blocks```, etc."
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 2 }}
                      >
                        <Code color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    fontFamily: "Monaco, Consolas, monospace",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 2 }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/blogs")}
                sx={{ borderRadius: 2, flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={createBlogMutation.isPending || !isFormValid}
                startIcon={
                  createBlogMutation.isPending ? <Save /> : <Publish />
                }
                sx={{
                  borderRadius: 1,
                  flex: 2,
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  },
                  "&:disabled": {
                    background: "grey.300",
                    boxShadow: "none",
                  },
                }}
              >
                {createBlogMutation.isPending
                  ? "Publishing..."
                  : "Publish Blog"}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
}

export default NewBlogForm;
