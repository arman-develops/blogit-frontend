import {
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import CopyLinkButton from "../../utils/CopyLink";
import { useAuthStore } from "../../store/authStore";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types/decodedToken.type";

function ProfileLink() {
  const token = useAuthStore.getState().token;
  const decoded = token ? jwtDecode<DecodedToken>(token) : null;
  const profileID = decoded?.profileID;
  const profileUrl = `${window.location.origin}/profiles/${profileID}`;
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        p: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "grey.200",
        mb: 2,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Your Public Profile Link
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          value={profileUrl}
          fullWidth
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy link">
                    <IconButton>
                      <CopyLinkButton objectID={profileUrl} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 1 },
            fontStyle: "italic",
          }}
        />
      </Stack>
    </Paper>
  );
}

export default ProfileLink;
