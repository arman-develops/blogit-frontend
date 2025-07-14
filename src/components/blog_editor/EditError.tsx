import { Alert } from "@mui/material";

function EditError({ updateBlogMutation }: any) {
  return (
    <>
      {updateBlogMutation.isError && (
        <Alert
          severity="error"
          sx={{
            mt: 3,
            borderRadius: 2,
          }}
        >
          Failed to update blog post. Please try again.
        </Alert>
      )}
    </>
  );
}

export default EditError;
