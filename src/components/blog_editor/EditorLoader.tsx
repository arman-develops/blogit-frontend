import { Box, Container, Paper, Stack, Skeleton, Grid } from "@mui/material";

function EditorLoader() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              mb: 4,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Box flexGrow={1}>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={40}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={24}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                />
              </Box>
            </Stack>
          </Paper>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Stack spacing={3}>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="rectangular" height={56} />
                  <Skeleton variant="rectangular" height={56} />
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton variant="rectangular" height={300} />
                </Stack>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Skeleton variant="rectangular" height={400} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default EditorLoader;
