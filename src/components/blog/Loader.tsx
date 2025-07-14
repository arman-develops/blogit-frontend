import { Box, Container, Skeleton, Stack } from "@mui/material";

function Loader() {
  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" width={40} height={40} />
          <Skeleton variant="text" height={60} width="80%" />
          <Skeleton variant="text" height={30} width="60%" />
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} width="70%" />
        </Stack>
      </Container>
    </>
  );
}

export default Loader;
