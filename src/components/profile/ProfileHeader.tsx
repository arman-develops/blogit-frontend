import { Box, Typography, Avatar, Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Article, Schedule } from "@mui/icons-material";
import api from "../../service/BlogApi";

export default function ProfileHeader() {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user");
      return res.data;
    },
  });

  const { data: userBlogs } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: async () => {
      const res = await api.get("/user/blogs");
      return res.data.filter((blog: any) => !blog.isDeleted);
    },
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (!userData) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 150,
          height: 150,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          transform: "translate(-50%, 50%)",
        }}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: "2.5rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            border: "4px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {getInitials(userData.firstName, userData.lastName)}
        </Avatar>

        <Box flexGrow={1}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 1 }}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            @{userData.username}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Article sx={{ fontSize: 20 }} />
              <Typography variant="body1" fontWeight={600}>
                {userBlogs?.length || 0} Blog Posts
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Schedule sx={{ fontSize: 20 }} />
              <Typography variant="body1" fontWeight={600}>
                Joined{" "}
                {formatJoinDate(userData.createdAt || new Date().toISOString())}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
