import { Container, Typography, Box, Button, Grid, Chip, Stack, Paper } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

function Hero() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthStore()

    return (
        <>
            <Box
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                py: { xs: 8, md: 12 },
                position: "relative",
                overflow: "hidden",
            }}
            >
            <Box
                sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
                }}
            />
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                <Grid size={{xs: 12, md: 6}}>
                    <Stack spacing={4}>
                    <Box>
                        <Chip
                        label="✨ New Platform Launch"
                        sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                            mb: 3,
                            backdropFilter: "blur(10px)",
                        }}
                        />
                        <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                        Share Your
                        <Box
                            component="span"
                            sx={{
                            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "block",
                            }}
                        >
                            Stories
                        </Box>
                        With The World
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}>
                        Create beautiful blogs with our modern, intuitive platform. Write, publish, and connect with readers
                        who love your content.
                        </Typography>
                    </Box>
    
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate(isAuthenticated ? "/blogs/new" : "/signup")}
                        sx={{
                            bgcolor: "white",
                            color: "primary.main",
                            px: 4,
                            py: 1.5,
                            fontSize: "1.1rem",
                            "&:hover": {
                            bgcolor: "grey.100",
                            transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                        >
                        {isAuthenticated ? "Start Writing" : "Get Started Free"}
                        </Button>
                        <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/blogs")}
                        sx={{
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "white",
                            px: 4,
                            py: 1.5,
                            "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255,255,255,0.1)",
                            },
                        }}
                        >
                        Explore Blogs
                        </Button>
                    </Stack>
                    </Stack>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Box
                    sx={{
                        position: "relative",
                        display: { xs: "none", md: "block" },
                    }}
                    >
                    <Paper
                        elevation={20}
                        sx={{
                        p: 3,
                        borderRadius: 4,
                        transform: "rotate(-5deg)",
                        bgcolor: "white",
                        maxWidth: 400,
                        mx: "auto",
                        }}
                    >
                        <Box sx={{ height: 200, bgcolor: "grey.100", borderRadius: 2, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                        The Future of Blogging
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Experience the next generation of content creation...
                        </Typography>
                    </Paper>
                    </Box>
                </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    )
}

export default Hero