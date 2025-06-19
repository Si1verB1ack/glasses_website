import { SetStateAction, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { debounce } from "lodash";

interface Product {
  id: number;
  name: string;
  price: string;
  reviews: number;
  image_url: string;
  color?: string;
  rating?: number;
}

// Skeleton component for product card
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md animate-pulse">
      <div className="h-48 sm:h-56 lg:h-64 bg-gray-200"></div>
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="w-3/4">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-200 rounded-full mr-1"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const productsPerPage = 15;

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          per_page: productsPerPage.toString(),
          search: search,
          active_only: "true",
        });
        const response = await fetch(
          `https://glasses-backend-kci0.onrender.com/api/products?${queryParams}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const productData = await response.json();
        console.log("Fetched products:", productData);

        const data = productData.products || [];
        const totalPages = productData.pages || 1;
        setProducts(data);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, search, productsPerPage]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.08 },
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
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }, 300);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading tracking-tight">
              Our Full Collection
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of premium eyewear, designed for style
              and comfort.
            </p>
            <div className="mt-4 max-w-md mx-auto">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base font-body"
                aria-label="Search products"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {Array.from({ length: productsPerPage }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-red-600">Error: {error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                per_page: productsPerPage.toString(),
                search: search,
                active_only: "true",
              });
              fetch(
                `https://glasses-backend-kci0.onrender.com/api/products?${queryParams}`
              )
                .then((response) => response.json())
                .then((productData) => {
                  setProducts(productData.products || []);
                  setTotalPages(productData.pages || 1);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(err.message);
                  setLoading(false);
                });
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="shop"
      className="py-12 sm:py-16 lg:py-20 bg-gray-50"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading tracking-tight">
            Our Full Collection
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium eyewear, designed for style
            and comfort.
          </p>
          <div className="mt-4 max-w-md mx-auto">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base font-body"
              aria-label="Search products"
            />
          </div>
        </motion.div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
            variants={containerVariants}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                variants={cardVariants}
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <motion.img
                    src={product.image_url || "https://placehold.co/600x400"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                  {product.rating && (
                    <motion.div
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-sm"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        delay: 0.2,
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <svg
                        className="h-5 w-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 font-heading">
                        {product.name}
                      </h3>
                      {product.color && (
                        <p className="text-sm text-gray-600 font-body">
                          {product.color}
                        </p>
                      )}
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-900 font-body">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                  </div>
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400"
                            fill={
                              i < Math.floor(product.rating!)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.15 + i * 0.03, duration: 0.3 }}
                            aria-hidden="true"
                          >
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3 .922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </motion.svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-body">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  )}
                  <motion.button
                    className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center text-sm sm:text-base font-body transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
        )}

        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mt-10 sm:mt-12 lg:mt-14 space-x-3 sm:space-x-4"
            variants={paginationVariants}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm sm:text-base font-body bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Previous page"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-body transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm sm:text-base font-body bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Next page"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}