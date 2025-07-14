import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Person,
  Email,
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  Save,
  Security,
} from "@mui/icons-material";
import api from "../../service/BlogApi";
import { useAuthStore } from "../../store/authStore";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types/decodedToken.type";

function UserInfo() {
  const queryClient = useQueryClient();
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userSuccess, setUserSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);

      setUserForm({
        firstName: decoded.firstName || "",
        lastName: decoded.lastName || "",
        username: decoded.username,
        email: decoded.email,
      });
    }
  }, [token]);

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      return api.patch("/user", userForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setUserSuccess("Profile updated successfully!");
      setUserError("");
      setTimeout(() => setUserSuccess(""), 3000);
    },
    onError: () => {
      setUserError("Failed to update profile");
      setUserSuccess("");
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async () => {
      return api.patch("/user/password", passwordForm);
    },
    onSuccess: () => {
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setPasswordSuccess("Password updated successfully!");
      setPasswordError("");
      setTimeout(() => setPasswordSuccess(""), 3000);
    },
    onError: () => {
      setPasswordError("Failed to update password. Check current password.");
      setPasswordSuccess("");
    },
  });

  return (
    <Grid container spacing={4}>
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
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: "primary.50",
                color: "primary.main",
              }}
            >
              <Person />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Personal Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Update your account details
              </Typography>
            </Box>
          </Stack>

          {userSuccess && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {userSuccess}
            </Alert>
          )}
          {userError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {userError}
            </Alert>
          )}

          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={userForm.firstName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, firstName: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={userForm.lastName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, lastName: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Username"
              fullWidth
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
              }
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
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Email"
              fullWidth
              type="email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => updateUserMutation.mutate()}
              disabled={updateUserMutation.isPending}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                },
              }}
            >
              {updateUserMutation.isPending ? "Updating..." : "Update Profile"}
            </Button>
          </Stack>
        </Paper>
      </Grid>

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
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "secondary.50",
                color: "secondary.main",
              }}
            >
              <Security />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Security Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Change your account password
              </Typography>
            </Box>
          </Stack>

          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {passwordSuccess}
            </Alert>
          )}
          {passwordError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {passwordError}
            </Alert>
          )}

          <Stack spacing={3}>
            <TextField
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              fullWidth
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
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
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              fullWidth
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<Security />}
              onClick={() => updatePasswordMutation.mutate()}
              disabled={
                updatePasswordMutation.isPending ||
                !passwordForm.currentPassword ||
                !passwordForm.newPassword
              }
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
                  boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
                },
              }}
            >
              {updatePasswordMutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserInfo;
