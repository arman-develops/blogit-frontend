import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate("/blogs")}
      sx={{ mb: 3, color: "text.secondary" }}
    >
      <ArrowBack />
    </IconButton>
  );
}

export default BackButton;
