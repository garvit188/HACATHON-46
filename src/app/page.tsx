import Navbar from "@/components/homepage/Navbar";
import HeroCarousel from "@/components/homepage/HeroCarousel";
import AboutSection from "@/components/homepage/AboutSection";
import NewsEvents from "@/components/homepage/NewsEvents";
import ExploreGrid from "@/components/homepage/ExploreGrid";
import PrincipalSection from "@/components/homepage/PrincipalSection";
import GallerySection from "@/components/homepage/GallerySection";
import Testimonials from "@/components/homepage/Testimonials";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <Navbar />
      <HeroCarousel />
      <AboutSection />
      <NewsEvents />
      <PrincipalSection />
      <ExploreGrid />
      <GallerySection />
      <Testimonials />
      <Footer />
    </main>
  );
}
