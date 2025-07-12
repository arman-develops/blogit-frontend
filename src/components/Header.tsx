"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Container,
  Fade,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { Create, Article, Person, Logout } from "@mui/icons-material"

export default function Header() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuthStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    navigate("/")
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
              transition: "opacity 0.2s",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
                B
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BlogSpace
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated && user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  display: { xs: "none", sm: "block" },
                  mr: 2,
                }}
              >
                Welcome back, {user.firstName}! 👋
              </Typography>

              <Button
                color="inherit"
                startIcon={<Article />}
                onClick={() => navigate("/blogs")}
                sx={{ color: "text.primary", "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" } }}
              >
                Explore
              </Button>

              <Button
                variant="contained"
                startIcon={<Create />}
                onClick={() => navigate("/blogs/new")}
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  },
                }}
              >
                Write
              </Button>

              <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile")
                    handleClose()
                  }}
                  sx={{ py: 1.5 }}
                >
                  <Person sx={{ mr: 2, fontSize: 20 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: "error.main" }}>
                  <Logout sx={{ mr: 2, fontSize: 20 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{ color: "text.primary", "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" } }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
