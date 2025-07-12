import {
  Box,
  Typography,
  Divider
} from '@mui/material'
import UserInfo from "../components/profile/UserInfo"
import UserBlogs from "../components/profile/UserBlogs"

export default function ProfilePage() {

  return (
    <Box p={3}>
        <Typography variant="h3" gutterBottom>
            My Profile
        </Typography>

        <UserInfo />

        <Divider sx={{ my: 4 }} />

        <UserBlogs />

    </Box>
  )
}
