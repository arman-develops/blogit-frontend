import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function Cta() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "white",
            textAlign: "center",
            p: 6,
          }}
        >
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Ready to Start Your Journey?
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: "auto" }}
            >
              Join thousands of writers who have already discovered the joy of
              blogging with BlogSpace
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(isAuthenticated ? "/blogs" : "/signup")}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: "grey.100",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isAuthenticated ? "Explore Blogs" : "Join BlogSpace Today"}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Cta;
