import { useState } from "react";
import { Tooltip, IconButton, Snackbar } from "@mui/material";
import { Link, Close } from "@mui/icons-material";

function CopyLinkButton({ objectID }: { objectID: string }) {
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    const blogUrl = `${window.location.origin}/blogs/${objectID}`;
    try {
      await navigator.clipboard.writeText(blogUrl);
      setOpen(true);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Copy blog link">
        <IconButton onClick={handleCopy}>
          <Link />
        </IconButton>
      </Tooltip>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Link copied to clipboard!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}

export default CopyLinkButton;
