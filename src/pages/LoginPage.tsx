import type React from "react";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import api from "../service/BlogApi";
import { useMutation } from "@tanstack/react-query";
import type { DecodedToken } from "../types/decodedToken.type";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data: { identifier: string; password: string }) => {
      const res = await api.post("/auth/login", data);
      const token = res.data.data.jwt_token;
      const decoded = jwtDecode<DecodedToken>(token);

      const user = {
        id: decoded.userID,
        profileID: decoded.profileID,
        username: decoded.username,
        email: decoded.email,
        firstName: decoded.firstName || "",
        lastName: decoded.lastName || "",
      };

      return { user, token };
    },
    onSuccess: ({ user, token }) => {
      login(user, token);
      navigate("/blogs");
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Failed to log in");
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    loginMutation.mutate({ identifier, password });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "grey.200",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue your blogging journey
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "0.875rem",
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email Address or Username"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
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
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 1,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                },
                "&:disabled": {
                  background: "grey.300",
                },
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }}>
          <Typography variant="body2" color="text.secondary">
            or
          </Typography>
        </Divider>

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create one here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
