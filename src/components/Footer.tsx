import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
      },
    }),
  };

  const socialIconVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    }
  };

  return (
    <motion.footer 
      id="footer" 
      className="bg-gray-900 text-white py-10 sm:py-12"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-4">VISTA</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Premium eye wear for the modern individual. Style, comfort, and
              quality in every frame.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <motion.svg
                    key={star}
                    custom={i}
                    variants={starVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <motion.span 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                4.9/5 from 2,400+ reviews
              </motion.span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {["All Glasses", "Sunglasses", "Prescription", "Accessories", "New Arrivals", "Best Sellers"].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {["FAQ", "Shipping & Returns", "Warranty Information", "Size Guide", "Prescription Help", "Contact Us"].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Connect</h3>
            <motion.div 
              className="flex space-x-4 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ staggerChildren: 0.1 }}
            >
              {["Instagram", "Facebook", "YouTube"].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={platform}
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {platform === "Instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {platform === "Facebook" && (
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    )}
                    {platform === "YouTube" && (
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm font-bold text-gray-300 mb-3">
                Subscribe to our newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 w-full text-white rounded-lg outline-1 outline-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                  aria-label="Email for newsletter"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                />
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <motion.p 
                className="text-xs text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                Get 10% off your first order when you sign up
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col md:flex-row md:justify-between md:items-center text-gray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            © {new Date().getFullYear()} VISTA Eyewear. All rights reserved.
          </motion.p>
          <motion.div 
            className="flex space-x-4 sm:space-x-6 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ staggerChildren: 0.1, delayChildren: 0.7 }}
          >
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, i) => (
              <motion.a 
                key={item}
                href="#" 
                className="hover:text-white transition-colors"
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}