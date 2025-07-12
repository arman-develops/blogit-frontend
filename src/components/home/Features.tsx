import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material"
import { Create, TrendingUp, People } from "@mui/icons-material"

function Features() {

    const features = [
    {
        icon: <Create sx={{ fontSize: 32 }} />,
        title: "Rich Editor",
        description: "Write with our powerful markdown editor featuring live preview and syntax highlighting",
        color: "#6366f1",
    },
    {
        icon: <TrendingUp sx={{ fontSize: 32 }} />,
        title: "Analytics",
        description: "Track your blog performance with detailed insights and engagement metrics",
        color: "#10b981",
    },
    {
        icon: <People sx={{ fontSize: 32 }} />,
        title: "Community",
        description: "Connect with fellow writers and build your audience in our vibrant community",
        color: "#f59e0b",
    },
    ]

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 10 }}>
            <Box textAlign="center" mb={8}>
                <Typography variant="h2" gutterBottom>
                Everything You Need
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                Powerful tools and features designed to make your blogging experience seamless and enjoyable
                </Typography>
            </Box>
    
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                <Grid size={{xs:12, md:4}} key={index}>
                    <Card
                    sx={{
                        height: "100%",
                        textAlign: "center",
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.100",
                        "&:hover": {
                        borderColor: feature.color,
                        "& .feature-icon": {
                            transform: "scale(1.1)",
                            color: feature.color,
                        },
                        },
                    }}
                    >
                    <CardContent>
                        <Box
                        className="feature-icon"
                        sx={{
                            color: "text.secondary",
                            mb: 3,
                            transition: "all 0.3s ease",
                        }}
                        >
                        {feature.icon}
                        </Box>
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                        {feature.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {feature.description}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </>
    )
}

export default Features