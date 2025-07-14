import type React from "react";

import {
  Box,
  Avatar,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Person, Logout, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../service/BlogApi";

export default function ProfileBar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user");
      return res.data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return api.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/login");
    },
    onError: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/login");
    },
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    handleMenuClose();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  if (!userData) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "white",
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* User Info */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 40,
              height: 40,
              fontSize: "0.875rem",
            }}
          >
            {getInitials(userData.firstName, userData.lastName)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{userData.username}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Button
            variant="outlined"
            startIcon={<Person />}
            onClick={handleProfileClick}
            size="small"
            sx={{ borderRadius: 1.5 }}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            startIcon={<Logout />}
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            size="small"
            color="error"
            sx={{ borderRadius: 1.5 }}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </Stack>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleProfileClick}>
              <Person sx={{ mr: 1, fontSize: 20 }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <Logout sx={{ mr: 1, fontSize: 20 }} />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Paper>
  );
}
