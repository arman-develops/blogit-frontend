import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditorError() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
            border: "1px solid",
            borderColor: "error.light",
          }}
        >
          <Typography
            variant="h3"
            color="error.main"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Blog Not Found
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            This blog may have been deleted or does not exist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/blogs")}
            sx={{
              mt: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
          >
            Back to Blogs
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditorError;
