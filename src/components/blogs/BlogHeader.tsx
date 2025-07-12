import {
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import { useBlogStore } from "../../store/blogStore"

function BlogHeader() {
    const { searchQuery, setSearchQuery } = useBlogStore()
    return (
        <>
            <Box mb={6}>
                <Typography
                variant="h2"
                gutterBottom
                sx={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                }}
                >
                Discover Amazing Stories
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                Explore our collection of insightful articles and stories from talented writers
                </Typography>

                <TextField
                fullWidth
                placeholder="Search articles, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Search color="action" />
                    </InputAdornment>
                    ),
                }}
                sx={{
                    maxWidth: 500,
                    "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "white",
                    "& fieldset": {
                        borderColor: "grey.200",
                    },
                    "&:hover fieldset": {
                        borderColor: "primary.main",
                    },
                    },
                }}
                />
            </Box>
        </>
    )
}

export default BlogHeader