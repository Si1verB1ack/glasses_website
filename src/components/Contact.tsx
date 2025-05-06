import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Contact() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add actual form submission logic here (e.g., API call)
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.section
      id="contact"
      className="py-12 sm:py-16 bg-white"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg font-body text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? Contact us, and we’ll get back to
            you promptly.
          </p>
        </motion.div>
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm sm:text-base font-body font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base font-body"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-body font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base font-body"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-body font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base font-body"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center bg-indigo-600 text-white font-body font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}