import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import FeaturedProducts from "./components/FeaturedProducts";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Shop from "./components/Shop";
import PageDetail from "./components/pageDetail";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash && pathname === "/") {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
      <main className="flex flex-col flex-grow mt-16 sm:mt-20 md:mt-0">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedProducts />
                <FeaturesSection />
                <TestimonialsSection />
                <Contact />
              </>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/page/:slug" element={<PageDetail />} /> {/* Added dynamic route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}