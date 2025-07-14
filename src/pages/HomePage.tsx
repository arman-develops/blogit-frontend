import { Box } from "@mui/material";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import Cta from "../components/home/CTA";

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <Features />
      <Testimonials />
      <Cta />
    </Box>
  );
}
