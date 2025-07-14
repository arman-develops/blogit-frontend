"use client";

import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Stack,
  Button,
  Paper,
  CardMedia,
} from "@mui/material";
import { Edit, Delete, Visibility, AccessTime, Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import api from "../../service/BlogApi";
import { useAuthStore } from "../../store/authStore";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types/decodedToken.type";
import CopyLinkButton from "../../utils/CopyLink";

function UserBlogs() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const token = useAuthStore((state) => state.token);

  const { data: userBlogs, isLoading } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: async () => {
      const res = await api.get("/user/blogs");

      return res.data.data.blogs.filter((blog: any) => !blog.isDeleted);
    },
  });

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

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBlogs"] });
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 1,
        bgcolor: "white",
        border: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Blog Posts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track your published articles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/blogs/new")}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
            },
          }}
        >
          New Blog
        </Button>
      </Stack>

      {isLoading ? (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">Loading your blogs...</Typography>
        </Box>
      ) : !userBlogs || userBlogs.length === 0 ? (
        <Box
          textAlign="center"
          py={8}
          sx={{
            bgcolor: "grey.50",
            borderRadius: 3,
            border: "2px dashed",
            borderColor: "grey.200",
          }}
        >
          <Typography variant="h6" gutterBottom color="text.secondary">
            No blog posts yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Start sharing your thoughts and ideas with the world
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/blogs/new")}
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
          >
            Write Your First Blog
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {userBlogs.map((blog: any) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={blog.blogID}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.100",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    borderColor: "primary.main",
                  },
                }}
              >
                {blog.featuredImage && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={blog.featuredImage}
                    alt={blog.title}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: "0.875rem",
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      }}
                    >
                      {getInitials(userForm.firstName, userForm.lastName)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {userForm.firstName} {userForm.lastName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(blog.dateCreated)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.synopsis}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{ p: 3, pt: 0, justifyContent: "space-between" }}
                >
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/blogs/${blog.blogID}`)}
                    sx={{ borderRadius: 2 }}
                  >
                    View
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <CopyLinkButton objectID={blog.blogID} />
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/blogs/edit/${blog.blogID}`)}
                      sx={{
                        color: "primary.main",
                        "&:hover": { bgcolor: "primary.50" },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this blog?")
                        ) {
                          deleteBlogMutation.mutate(blog.blogID);
                        }
                      }}
                      sx={{
                        color: "error.main",
                        "&:hover": { bgcolor: "error.50" },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
}

export default UserBlogs;
