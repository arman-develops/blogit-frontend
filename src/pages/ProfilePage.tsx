import { Box, Divider } from "@mui/material";
import UserInfo from "../components/profile/UserInfo";
import UserBlogs from "../components/profile/UserBlogs";
import ProfileLink from "../components/profile/ProfileLink";

export default function ProfilePage() {
  return (
    <Box p={3}>
      <ProfileLink />

      <UserBlogs />

      <Divider sx={{ my: 4 }} />

      <UserInfo />
    </Box>
  );
}
