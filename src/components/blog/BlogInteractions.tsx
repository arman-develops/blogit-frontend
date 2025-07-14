import type React from "react"
import { Box, IconButton, Typography, Stack, Menu, MenuItem, Snackbar, Alert, Tooltip, Divider } from "@mui/material"
import {
  Favorite,
  FavoriteBorder,
  Share,
  Twitter,
  Facebook,
  LinkedIn,
  Link as LinkIcon,
  WhatsApp,
} from "@mui/icons-material"
import { useState } from "react"

interface BlogInteractionsProps {
  blogId: string
  blogTitle: string
  blogUrl?: string
  initialLikes?: number
  isLiked?: boolean
}

export default function BlogInteractions({
  blogTitle,
  blogUrl = window.location.href,
  initialLikes = 0,
  isLiked = false,
}: BlogInteractionsProps) {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))

    setSnackbar({
      open: true,
      message: liked ? "Removed from favorites" : "Added to favorites!",
      severity: "success",
    })
  }

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget)
  }

  const handleShareClose = () => {
    setShareAnchorEl(null)
  }

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`,
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      color: "#4267B2",
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`,
      color: "#0077B5",
    },
    {
      name: "WhatsApp",
      icon: <WhatsApp />,
      url: `https://wa.me/?text=${encodeURIComponent(`${blogTitle} ${blogUrl}`)}`,
      color: "#25D366",
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
    handleShareClose()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl)
      setSnackbar({
        open: true,
        message: "Link copied to clipboard!",
        severity: "success",
      })
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to copy link",
        severity: "error",
      })
    }
    handleShareClose()
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={liked ? "Remove from favorites" : "Add to favorites"}>
            <IconButton
              onClick={handleLike}
              sx={{
                color: liked ? "error.main" : "text.secondary",
                "&:hover": {
                  bgcolor: liked ? "error.50" : "grey.100",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </Typography>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Share this blog">
          <IconButton
            onClick={handleShareClick}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "primary.50",
                color: "primary.main",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Share />
          </IconButton>
        </Tooltip>
      </Stack>

      <Menu
        anchorEl={shareAnchorEl}
        open={Boolean(shareAnchorEl)}
        onClose={handleShareClose}
        slotProps={{
          paper: {
            sx: {
                borderRadius: 2,
                minWidth: 200,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            },
          }
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: "text.secondary" }}>
            Share this blog
          </Typography>

          {shareOptions.map((option) => (
            <MenuItem
              key={option.name}
              onClick={() => handleShare(option.url)}
              sx={{
                borderRadius: 1,
                my: 0.5,
                "&:hover": {
                  bgcolor: `${option.color}15`,
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ color: option.color }}>{option.icon}</Box>
                <Typography variant="body2">{option.name}</Typography>
              </Stack>
            </MenuItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <MenuItem
            onClick={handleCopyLink}
            sx={{
              borderRadius: 1,
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinkIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body2">Copy link</Typography>
            </Stack>
          </MenuItem>
        </Box>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
