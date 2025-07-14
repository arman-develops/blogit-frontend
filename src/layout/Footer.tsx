import { Box, Container, Typography, Stack, Link, IconButton, Divider } from "@mui/material"
import { GitHub, Twitter, LinkedIn, Email, Favorite } from "@mui/icons-material"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={4}
          >
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
                    B
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  BlogIt
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8, maxWidth: 300 }}>
                Share your thoughts, stories, and ideas with the world. A modern blogging platform built for creators.
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} textAlign={{ xs: "center", md: "left" }}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Platform
                </Typography>
                <Stack spacing={1}>
                  <Link href="/blogs" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Explore Blogs
                  </Link>
                  <Link href="/blogs/new" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Write a Blog
                  </Link>
                  <Link href="/profile" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    My Profile
                  </Link>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Community
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Guidelines
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Support
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    FAQ
                  </Link>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Legal
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Privacy Policy
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Terms of Service
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                    Cookie Policy
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "grey.700" }} />

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © {currentYear} BlogSpace. Made with
              </Typography>
              <Favorite sx={{ fontSize: 16, color: "#f87171" }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                for writers everywhere
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <Email fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
