import { motion, useScroll, useTransform } from "framer-motion";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0.92]);
  const scale = useTransform(scrollY, [0, 120], [1, 0.97]);
  const y = useTransform(scrollY, [0, 120], [0, -5]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkVariants = {
    hidden: { opacity: 0.3, y: 15, filter: "blur(2px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <motion.header
      className="bg-white py-0.5 shadow-sm fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ opacity, scale, y, transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-blur { filter: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.h1
            className="text-lg sm:text-xl pr-2 font-heading font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <a href="#hero">VISTA</a>
          </motion.h1>
          <nav className="hidden md:flex space-x-6">
            {["Collection", "Features", "Testimonials", "Contact"].map((text, i) => (
              <motion.a
                key={text}
                href={`#${text.toLowerCase()}`}
                className="text-gray-700 hover:text-gray-900 font-body text-sm sm:text-base motion-blur"
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                {text}
              </motion.a>
            ))}
          </nav>
        </div>
        {!isMenuOpen && (
          <div className="flex items-center space-x-2 ml-auto">
            <motion.a
              href="#contact"
              className="hidden sm:block bg-gray-200 text-gray-700 font-body font-medium py-1 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base motion-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Sign Up
            </motion.a>
            <motion.a
              href="#contact"
              className="hidden sm:block bg-indigo-600 text-white font-body font-medium py-1 px-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base motion-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              Contact Us
            </motion.a>
          </div>
        )}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 p-2 z-50"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
}