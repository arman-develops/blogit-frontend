import { Box } from "@mui/material";

function FeaturedImage({ blog }: any) {
  return (
    <>
      {blog.featuredImage && (
        <Box
          component="img"
          src={blog.featuredImage}
          alt={blog.title}
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 0.3,
            mb: 4,
          }}
        />
      )}
    </>
  );
}

export default FeaturedImage;
