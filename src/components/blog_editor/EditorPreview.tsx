import { Grid, Paper, Box, Tabs, Tab, Typography, Stack } from "@mui/material";
import { Preview, Edit, Visibility } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function EditorPreview({ tabValue, handleTabChange, formData }: any) {
  return (
    <>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            bgcolor: "white",
            border: "1px solid",
            borderColor: "grey.100",
            overflow: "hidden",
            position: "sticky",
            top: 20,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                },
              }}
            >
              <Tab icon={<Edit />} label="Editor" />
              <Tab icon={<Visibility />} label="Preview" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Markdown Guide
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Headers:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monospace"
                  >
                    # H1, ## H2, ### H3
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Text Formatting:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monospace"
                  >
                    **bold**, *italic*, `code`
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Lists:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monospace"
                  >
                    - Item 1{"\n"}- Item 2
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Links:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monospace"
                  >
                    [Link text](URL)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Code Blocks:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monospace"
                  >
                    ```javascript{"\n"}code here{"\n"}```
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 4, maxHeight: 600, overflow: "auto" }}>
              {formData.content ? (
                <>
                  {formData.featuredImage && (
                    <Box
                      component="img"
                      src={formData.featuredImage}
                      alt="Featured"
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 3,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {formData.title && (
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {formData.title}
                    </Typography>
                  )}
                  {formData.synopsis && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      paragraph
                      sx={{ fontStyle: "italic" }}
                    >
                      {formData.synopsis}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      "& h1": {
                        fontSize: "2rem",
                        fontWeight: 700,
                        mb: 2,
                        mt: 3,
                        color: "text.primary",
                        "&:first-of-type": { mt: 0 },
                      },
                      "& h2": {
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        color: "text.primary",
                      },
                      "& h3": {
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        mb: 1,
                        mt: 2,
                        color: "text.primary",
                      },
                      "& p": {
                        mb: 2,
                        lineHeight: 1.7,
                        color: "text.primary",
                      },
                      "& ul, & ol": {
                        mb: 2,
                        pl: 3,
                        "& li": {
                          mb: 0.5,
                          lineHeight: 1.6,
                        },
                      },
                      "& blockquote": {
                        borderLeft: "4px solid #6366f1",
                        pl: 2,
                        py: 1,
                        my: 2,
                        ml: 0,
                        fontStyle: "italic",
                        bgcolor: "grey.50",
                        borderRadius: "0 8px 8px 0",
                      },
                      "& code": {
                        bgcolor: "grey.100",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontFamily: "Monaco, Consolas, monospace",
                        fontSize: "0.875rem",
                      },
                      "& pre": {
                        bgcolor: "#1a1a1a",
                        color: "#f8f8f2",
                        p: 2,
                        borderRadius: 2,
                        overflow: "auto",
                        my: 2,
                        "& code": {
                          bgcolor: "transparent",
                          p: 0,
                          color: "inherit",
                        },
                      },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 1,
                        my: 2,
                      },
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {formData.content}
                    </ReactMarkdown>
                  </Box>
                </>
              ) : (
                <Box textAlign="center" py={8}>
                  <Preview sx={{ fontSize: 48, color: "grey.300", mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Preview will appear here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start editing your blog content to see the live preview
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        </Paper>
      </Grid>
    </>
  );
}

export default EditorPreview;
