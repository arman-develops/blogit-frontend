import { Paper, Box, Stack, IconButton, Typography, Chip } from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NewBlogHeader() {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <IconButton
            onClick={() => navigate("/blogs")}
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box flexGrow={1}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontWeight: 800, mb: 1 }}
            >
              Create New Blog Post
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Share your thoughts and ideas with the world
            </Typography>
          </Box>
          <Chip
            icon={<Edit />}
            label="Draft"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default NewBlogHeader;
