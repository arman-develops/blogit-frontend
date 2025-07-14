import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Paper, Container, Divider } from "@mui/material";

import api from "../service/BlogApi";
import BackButton from "../components/blog/Back";
import FeaturedImage from "../components/blog/FeaturedImage";
import BlogTitle from "../components/blog/Title";
import Synopsis from "../components/blog/Synopsis";
import Loader from "../components/blog/Loader";
import ErrorBlock from "../components/blog/ErrorBlock";
import AuthorInfo from "../components/blog/AuthorInfo";
import BlogContent from "../components/blog/BlogContent";
import BlogInteractions from "../components/blog/BlogInteractions";

export default function BlogPage() {
  const { blogID } = useParams<{ blogID: string }>();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", blogID],
    queryFn: async () => {
      const res = await api.get(`/blogs/${blogID}`);
      console.log(res.data.data.blog);

      if (res.data.data.blog.isDeleted) {
        throw new Error("Blog has been deleted");
      }
      return res.data.data.blog;
    },
    enabled: !!blogID,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !blog) {
    return <ErrorBlock />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <BackButton />

      <Paper elevation={1} sx={{ p: 4, borderRadius: 0.6 }}>
        <FeaturedImage blog={blog} />

        <BlogTitle blog={blog} />

        <Synopsis blog={blog} />

        <AuthorInfo blog={blog} />

        <Divider sx={{ mb: 4 }} />

        <BlogContent blog={blog} />

        <Divider sx={{ my: 4 }} />

        <BlogInteractions
          blogId={blogID || ""}
          blogTitle={blog.title}
          initialLikes={Math.floor(Math.random() * 50) + 1}
          isLiked={Math.random() > 0.5}
        />
      </Paper>
    </Container>
  );
}
