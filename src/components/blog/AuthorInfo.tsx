import {
  Edit,
  AccessTime,
  CalendarToday,
  Share,
  ThumbUp,
} from "@mui/icons-material";
import { Stack, Avatar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import { formatDate } from "../../utils/formatDate";
import { formatReadTime } from "../../utils/formatReadTime";
import { useAuthStore } from "../../store/authStore";

function AuthorInfo({ blog }: any) {
  const {user} = useAuthStore()
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {getInitials(blog?.user?.firstName || "", blog?.user?.lastName || "")}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {blog?.user?.firstName} {blog?.user?.lastName}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            color="text.secondary"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarToday sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {formatDate(blog?.dateCreated)}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTime sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {formatReadTime(blog?.content)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Stack direction="row" sx={{ gap: "10px" }}>
        {blog.userID == user?.id && 
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate(`/blogs/edit/${blog.blogID}`)}
            size="small"
          >
            Edit
          </Button>
        }
        <Button
          variant="outlined"
          startIcon={<ThumbUp />}
          size="small"
        >
          Like
        </Button>
        <Button
          variant="outlined"
          startIcon={<Share />}
          size="small"
        >
          Share
        </Button>
      </Stack>
    </Stack>
  );
}

export default AuthorInfo;
