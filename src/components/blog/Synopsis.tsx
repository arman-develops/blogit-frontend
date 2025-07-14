import { Typography } from "@mui/material";

function Synopsis({ blog }: any) {
  return (
    <Typography
      variant="h6"
      color="text.secondary"
      component="p"
      sx={{
        fontWeight: 400,
        lineHeight: 1.5,
        mb: 3,
      }}
    >
      {blog?.synopsis}
    </Typography>
  );
}

export default Synopsis;
