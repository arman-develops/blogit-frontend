import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
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

export default function EditBlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    featuredImageUrl: "",
    title: "",
    synopsis: "",
    content: "",
  })

  const { data: blogData, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`)
      if (res.data.isDeleted) throw new Error("Deleted")
      return res.data
    },
  })

  useEffect(() => {
    if (blogData) {
      setFormData({
        featuredImageUrl: blogData.featuredImageUrl || "",
        title: blogData.title || "",
        synopsis: blogData.synopsis || "",
        content: blogData.content || "",
      })
    }
  }, [blogData])

  const updateBlogMutation = useMutation({
    mutationFn: async () => {
      return api.patch(`/blogs/${id}`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] })
      queryClient.invalidateQueries({ queryKey: ["userBlogs"] })
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      navigate(`/blogs/${id}`)
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to update blog.")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateBlogMutation.mutate()
  }

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !blogData) {
    return (
      <Box p={4}>
        <Typography variant="h4" color="error">
          Blog Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This blog may have been deleted or does not exist.
        </Typography>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Edit Blog
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{xs: 12}}>
            <TextField
              label="Featured Image URL"
              name="featuredImageUrl"
              fullWidth
              value={formData.featuredImageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12}}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12}}>
            <TextField
              label="Synopsis"
              name="synopsis"
              fullWidth
              multiline
              rows={2}
              required
              value={formData.synopsis}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              label="Content (Markdown supported)"
              name="content"
              fullWidth
              multiline
              rows={10}
              required
              value={formData.content}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12}}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={updateBlogMutation.isPending}
            >
              {updateBlogMutation.isPending ? "Updating..." : "Update Blog"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {formData.content && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            Live Preview
          </Typography>
          <Paper sx={{ p: 3 }}>
            <ReactMarkdown
              children={formData.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
                h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
                p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} />,
              }}
            />
          </Paper>
        </>
      )}
    </Box>
  )
}
