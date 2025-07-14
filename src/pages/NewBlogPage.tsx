import type React from "react";

import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../service/BlogApi";
import NewBlogHeader from "../components/new_blog/Header";
import NewBlogForm from "../components/new_blog/NewBlogForm";
import BlogPreview from "../components/new_blog/BlogPreview";
import ErrorAlert from "../components/new_blog/ErrorAlert";

export default function NewBlogPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    featuredImage: "",
    title: "",
    synopsis: "",
    content: "",
  });

  const createBlogMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/blogs", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs");
    },
    onError: (err: any) => {
      console.error(
        "Error creating blog:",
        err?.response?.data?.message || "Something went wrong.",
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
    createBlogMutation.mutate();
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isFormValid = formData.title && formData.synopsis && formData.content;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <NewBlogHeader />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <NewBlogForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              createBlogMutation={createBlogMutation}
              isFormValid={isFormValid}
            />

            <BlogPreview
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              formData={formData}
            />
          </Grid>
        </form>

        <ErrorAlert createBlogMutation={createBlogMutation} />
      </Container>
    </Box>
  );
}
