import { motion } from "framer-motion";
import GlassesViewer from "./GlassesViewer";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -30, rotate: -5, filter: "blur(2px)" },
    visible: { opacity: 1, x: 0, rotate: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] } },
  };

  const viewerVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.98, filter: "blur(3px)" },
    visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <motion.section
      id="hero"
      className="py-32 sm:py-24 md:py-32 md:mt-8 bg-gray-100"
      initial={{ opacity: 0.3, y: 40, scale: 0.98, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, amount: 0.25, margin: "-100px" }}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-blur { filter: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left motion-blur"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            variants={textVariants}
          >
            Discover Premium Eyewear
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-600 mb-6"
            variants={textVariants}
          >
            Style, comfort, and quality crafted for you. Explore our collection today.
          </motion.p>
          <motion.a
            href="#featured"
            className="inline-flex items-center bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base motion-blur"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.a>
        </motion.div>
        <motion.div
          className="lg:w-1/2 h-64 sm:h-80 lg:h-96 w-full motion-blur"
          variants={viewerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GlassesViewer />
        </motion.div>
      </div>
    </motion.section>
  );
}