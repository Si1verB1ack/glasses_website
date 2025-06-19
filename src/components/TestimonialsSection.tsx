import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "These are the most comfortable frames I've ever worn. The quality is exceptional and they're incredibly durable.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      quote:
        "The clarity of these lenses is amazing. I can wear them all day without any eye strain, even when I'm working on my computer.",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      quote:
        "VISTA glasses have transformed my daily life. They're stylish, lightweight, and I get compliments everywhere I go.",
      author: "Emily Rodriguez",
      role: "Architect",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
  ];

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
        staggerChildren: 0.2,
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

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers around the world
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm relative hover:shadow-md transition-shadow duration-300"
            >
              <svg
                className="absolute top-4 sm:top-6 left-4 sm:left-6 h-8 w-8 text-indigo-400 opacity-20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <div className="relative z-10 pt-6 sm:pt-8">
                <p className="italic text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center border-t border-gray-200 pt-4">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-indigo-400"
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                      {testimonial.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-center mt-8 sm:mt-12"
        >
          <div className="flex space-x-1 sm:space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star, i) => (
              <motion.svg
                key={star}
                custom={i}
                variants={starVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                whileHover={{ scale: 1.2 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <p className="text-lg sm:text-xl font-bold">4.9 out of 5</p>
          <p className="text-gray-600 text-sm sm:text-base">Based on 2,400+ reviews</p>
        </motion.div>
      </div>
    </section>
  );
}