import { Typography } from "@mui/material";

function BlogTitle({ blog }: any) {
  return (
    <Typography
      variant="h3"
      gutterBottom
      sx={{
        fontWeight: 700,
        fontSize: { xs: "2rem", md: "2.5rem" },
        lineHeight: 1.2,
        mb: 2,
      }}
    >
      {blog?.title}
    </Typography>
  );
}

export default BlogTitle;
