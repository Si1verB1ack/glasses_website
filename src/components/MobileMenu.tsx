import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  setIsMenuOpen: (open: boolean) => void;
}

export default function MobileMenu({ setIsMenuOpen }: MobileMenuProps) {
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const linkVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -30 : 30,
      rotate: i % 2 === 0 ? -5 : 5,
      filter: "blur(2px)",
    }),
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <motion.div
      className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-blur { filter: none !important; transform: none !important; }
        }
      `}</style>
      <motion.button
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        onClick={() => setIsMenuOpen(false)}
        initial={{ opacity: 0, rotate: 90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
      <nav className="flex flex-col items-center space-y-6 text-lg font-body">
        {["Home", "Shop", "Features", "Testimonials", "Contact"].map((text, i) => (
          <motion.div
            key={text}
            className="text-gray-700 hover:text-gray-900 font-medium motion-blur"
            custom={i}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            onClick={handleNavClick}
          >
            {text === "Shop" ? (
              <Link to="/shop">{text}</Link>
            ) : text === "Home" ? (
              <Link to="/">{text}</Link>
            ) : (
              <a href={`#${text.toLowerCase()}`}>{text}</a>
            )}
          </motion.div>
        ))}
        <motion.div
          className="flex space-x-6 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <a
            href="#contact"
            className="bg-gray-200 text-gray-700 font-body font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-lg"
            onClick={handleNavClick}
          >
            Sign Up
          </a>
          <a
            href="#contact"
            className="bg-indigo-600 text-white font-body font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg"
            onClick={handleNavClick}
          >
            Contact Us
          </a>
        </motion.div>
      </nav>
    </motion.div>
  );
}