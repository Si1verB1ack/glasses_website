const viewAllVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  reviews: number;
  image_url: string;
}

// Skeleton component for product card
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 sm:h-64 bg-gray-200"></div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="w-3/4">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
      </div>
    </div>
  );
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search] = useState("");
  const [activeOnly] = useState(false);
  const [featuredOnly] = useState(true);
  const skeletonCount = 3; // Reduced to 3 skeletons

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: "1",
          per_page: "6",
          search: search,
          ...(activeOnly && { active_only: activeOnly.toString() }),
          ...(featuredOnly && { featured_only: featuredOnly.toString() }),
        });
        const response = await fetch(
          `https://glasses-backend-kci0.onrender.com/api/products?${queryParams}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const productData = await response.json();
        console.log("Fetched products:", productData.products);
        const data = productData.products || [];
        setProducts(data || []);
        console.log("Fetched products:", data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0.9, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: { scale: 0.98 },
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our most popular styles crafted with precision and designed
              for comfort
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="collection"
      className="py-12 sm:py-16 bg-gray-50"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our most popular styles crafted with precision and designed
            for comfort
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{
                y: -2,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="h-48 sm:h-64 overflow-hidden relative">
                <motion.img
                  src={product.image_url || "https://placehold.co/600x400"}
                  alt={product.name || "Product image"}
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                </div>
                <motion.button
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center text-sm sm:text-base"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8 sm:mt-10"
          variants={viewAllVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 text-sm sm:text-base"
            variants={viewAllVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              x: 2,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
          >
            <Link to="/shop" className="inline-flex items-center">
              View All Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
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
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}