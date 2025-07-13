import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Divider,
  Paper,
} from "@mui/material"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})

export default function BlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`)
      if (res.data.isDeleted) {
        throw new Error("Deleted blog")
      }
      return res.data
    },
  })

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !blog) {
    return (
      <Box p={4}>
        <Typography variant="h4" color="error">
          Blog Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The blog you're looking for doesn't exist or has been deleted.
        </Typography>
      </Box>
    )
  }

  const initials = blog.author?.firstName[0] + blog.author?.lastName[0]

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ mr: 2 }}>{initials}</Avatar>
        <Box>
          <Typography variant="subtitle1">
            {blog.author?.firstName} {blog.author?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(blog.dateCreated).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      <Box component="img"
        src={blog.featuredImageUrl}
        alt="Featured"
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 2,
          mb: 3,
        }}
      />

      <Typography variant="h6" gutterBottom>
        {blog.synopsis}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Paper elevation={1} sx={{ p: 3 }}>
        <ReactMarkdown
          children={blog.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
            h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
            p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} />,
            li: ({ node, ...props }) => <li><Typography variant="body1" component="span" {...props} /></li>,
          }}
        />
      </Paper>
    </Box>
  )
}
