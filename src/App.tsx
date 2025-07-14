import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Header from "./layout/Header"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPage from "./pages/BlogPage";
import NewBlogPage from "./pages/NewBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { blogTheme } from "./theme/blogTheme";
import Footer from "./layout/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={blogTheme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              minHeight: "100vh",
              bgcolor: "background.default",
              width: "100vw",
              overflowX: "hidden",
            }}
          >
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:blogID" element={<BlogPage />} />
                <Route
                  path="/blogs/new"
                  element={
                    <ProtectedRoute>
                      <NewBlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blogs/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditBlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
