import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BlogContent({ blog }: any) {
  return (
    <Box
      sx={{
        "& h1": {
          fontSize: "2rem",
          fontWeight: 600,
          mb: 2,
          mt: 3,
          "&:first-of-type": { mt: 0 },
        },
        "& h2": {
          fontSize: "1.5rem",
          fontWeight: 600,
          mb: 2,
          mt: 3,
        },
        "& h3": {
          fontSize: "1.25rem",
          fontWeight: 600,
          mb: 1,
          mt: 2,
        },
        "& p": {
          mb: 2,
          lineHeight: 1.7,
          fontSize: "1rem",
        },
        "& ul, & ol": {
          mb: 2,
          pl: 3,
          "& li": {
            mb: 0.5,
            lineHeight: 1.6,
          },
        },
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "primary.main",
          pl: 2,
          py: 1,
          my: 2,
          ml: 0,
          fontStyle: "italic",
          bgcolor: "grey.50",
        },
        "& code": {
          bgcolor: "grey.100",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.875rem",
        },
        "& pre": {
          bgcolor: "grey.900",
          color: "white",
          p: 2,
          borderRadius: 1,
          overflow: "auto",
          my: 2,
          "& code": {
            bgcolor: "transparent",
            p: 0,
            color: "inherit",
          },
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 1,
          my: 2,
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog?.content}</ReactMarkdown>
    </Box>
  );
}

export default BlogContent;
