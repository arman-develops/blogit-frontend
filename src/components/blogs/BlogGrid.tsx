import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../../store/blogStore";
import { useQuery } from "@tanstack/react-query";
import api from "../../service/BlogApi";

function BlogGrid() {
  const navigate = useNavigate();
  const { searchQuery } = useBlogStore();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const {
    data: blogs = [],
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get("/blogs");

      return res.data.data.blogs.filter((blog: any) => !blog.isDeleted);
    },
  });

  const filteredBlogs = blogs.filter(
    (blog: any) =>
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.synopsis?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.authorName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {isLoading ? (
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : filteredBlogs.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" gutterBottom color="text.secondary">
            {searchQuery ? "No blogs found" : "No blogs available"}
          </Typography>
          <Typography color="text.secondary" component="p">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Be the first to share your story with the community!"}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              onClick={() => navigate("/blogs/new")}
              sx={{ mt: 2 }}
            >
              Write Your First Blog
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredBlogs.map((blog: any) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={blog.blogID}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  "&:hover": {
                    "& .blog-image": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
                onClick={() => navigate(`/blogs/${blog.blogID}`)}
              >
                <Box sx={{ overflow: "hidden", height: 200 }}>
                  <CardMedia
                    className="blog-image"
                    component="img"
                    height="200"
                    image={blog.featuredImage}
                    alt={blog.title}
                    sx={{
                      transition: "transform 0.3s ease",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight={600}
                    sx={{ lineHeight: 1.3 }}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="p"
                    sx={{
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      pt: "1rem",
                      pb: "1rem",
                    }}
                  >
                    {blog.synopsis}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={2} mt={4}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        fontSize: "0.875rem",
                      }}
                    >
                      {getInitials(
                        `${blog.user.firstName} ${blog.user.lastName}`,
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {`${blog.user.lastName} ${blog.user.firstName}`}
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
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    size="small"
                    sx={{
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "primary.50",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default BlogGrid;
