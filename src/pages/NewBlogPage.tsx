import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import api from '../service/BlogApi'

export default function NewBlogPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    featuredImageUrl: "",
    title: "",
    synopsis: "",
    content: "",
  })

  const createBlogMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/blogs", formData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      navigate("/blogs")
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Something went wrong.")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBlogMutation.mutate()
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Create New Blog
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
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

          <Grid size={{xs:12}}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending ? "Submitting..." : "Create Blog"}
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
