import type React from "react";

import { Box, Grid, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import api from "../service/BlogApi";
import EditHeader from "../components/blog_editor/EditorHeader";
import EditForm from "../components/blog_editor/EditorForm";
import EditorPreview from "../components/blog_editor/EditorPreview";
import EditError from "../components/blog_editor/EditError";
import EditorLoader from "../components/blog_editor/EditorLoader";
import EditorError from "../components/blog_editor/EditorError";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    featuredImage: "",
    title: "",
    synopsis: "",
    content: "",
  });

  const {
    data: blogData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogData", id],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`);
      if (res.data.isDeleted) throw new Error("Blog has been deleted");
      return res.data.data.blog;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (blogData) {
      setFormData({
        featuredImage: blogData.featuredImage || "",
        title: blogData.title || "",
        synopsis: blogData.synopsis || "",
        content: blogData.content || "",
      });
    }
  }, [blogData]);

  const updateBlogMutation = useMutation({
    mutationFn: async () => {
      return api.patch(`/blogs/${id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      queryClient.invalidateQueries({ queryKey: ["userBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate(`/blogs/${id}`);
    },
    onError: (err: any) => {
      console.error(
        "Error updating blog:",
        err?.response?.data?.message || "Failed to update blog.",
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBlogMutation.mutate();
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isFormValid = formData.title && formData.synopsis && formData.content;

  // Loading State
  if (isLoading) {
    return <EditorLoader />;
  }

  // Error State
  if (isError || !blogData) {
    return <EditorError />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <EditHeader blogData={blogData} id={id} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <EditForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateBlogMutation={updateBlogMutation}
              id={id}
              isFormValid={isFormValid}
            />

            <EditorPreview
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              formData={formData}
            />
          </Grid>
        </form>

        <EditError updateBlogMutation={updateBlogMutation} />
      </Container>
    </Box>
  );
}
