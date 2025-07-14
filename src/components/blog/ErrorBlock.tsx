import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorBlock() {
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="error">
          Blog Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The blog you're looking for doesn't exist or has been deleted.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/blogs")}>
          Back to Blogs
        </Button>
      </Container>
    </>
  );
}

export default ErrorBlock;
