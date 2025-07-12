import { Container, Typography, Box, Card, CardContent, Grid, Avatar } from "@mui/material"
import { Star } from "@mui/icons-material"
import { testimonials } from "../../data/testimonials"

function Testimonials() {
    return (
        <>
            <Box sx={{ bgcolor: "grey.50", py: 10 }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={8}>
                <Typography variant="h2" gutterBottom>
                    Loved by Writers
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    See what our community has to say about BlogSpace
                </Typography>
                </Box>
    
                <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                    <Grid size={{xs:12, md:4}} key={index}>
                    <Card sx={{ height: "100%", p: 3 }}>
                        <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            {[...Array(5)].map((_, i) => (
                            <Star key={i} sx={{ color: "#fbbf24", fontSize: 20 }} />
                            ))}
                        </Box>
                        <Typography variant="body1" paragraph sx={{ fontStyle: "italic", lineHeight: 1.6 }}>
                            "{testimonial.content}"
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: "primary.main" }}>{testimonial.avatar}</Avatar>
                            <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {testimonial.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {testimonial.role}
                            </Typography>
                            </Box>
                        </Box>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Container>
            </Box>
        </>
    )
}

export default Testimonials