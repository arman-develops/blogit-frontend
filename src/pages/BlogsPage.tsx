import {Container} from "@mui/material"
import BlogHeader from "../components/blogs/BlogHeader"
import BlogGrid from "../components/blogs/BlogGrid"

export default function BlogsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <BlogHeader />
      <BlogGrid />
    </Container>
  )
}
