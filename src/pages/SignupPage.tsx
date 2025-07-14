"use client";

import type React from "react";

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
  Grid,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  AccountCircle,
} from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import type { SignupData } from "../types/signup.types";
import api from "../service/BlogApi";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/decodedToken.type";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const res = await api.post("/auth/register", data);
      const token = res.data.data.jwt_token;
      const decoded = jwtDecode<DecodedToken>(token);

      const user = {
        id: decoded.userID,
        username: decoded.username,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
      };
      return { user, token };
    },
    onSuccess: ({ user, token }) => {
      login(user, token);
      navigate("/blogs");
    },
    onError: (err: any) => {
      console.error(err);
      setError("Sign up failed");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signupMutation.mutate(formData);
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
            Join BlogSpace
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your account and start sharing your stories
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
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
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="action" />
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
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
              {loading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
