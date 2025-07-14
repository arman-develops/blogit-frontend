import { Alert } from "@mui/material";

function ErrorAlert({ createBlogMutation }: any) {
  return (
    <>
      {/* Error Alert */}
      {createBlogMutation.isError && (
        <Alert
          severity="error"
          sx={{
            mt: 3,
            borderRadius: 2,
          }}
        >
          Failed to create blog post. Please try again.
        </Alert>
      )}
    </>
  );
}

export default ErrorAlert;
