import { useState } from "react";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import FeaturedProducts from "./components/FeaturedProducts";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
      <main className="flex flex-col flex-grow mt-16 sm:mt-20 md:mt-0">
        <Hero />
        <FeaturedProducts />
        <FeaturesSection />
        <TestimonialsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}