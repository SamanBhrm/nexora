import { useContext, useEffect, useState } from "react";
import {
  Funnel,
  X
} from "lucide-react";

import { ProductContext } from "../../Context/ProductContext.jsx";
import { useCart } from "../../Context/CartContext.jsx";
import { useSearchParams } from "react-router-dom";

import ShopProducts from "./ShopProducts.jsx";


const ShopSection = () => {

  const {
    products = [],
    shopCategories = [],
    loading,
    error
  } = useContext(ProductContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();


  // Filters

  const selectedCategories = searchParams.getAll("category");

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);


  // Brands

  const brands = [
    "Apple",
    "Dell",
    "Samsung",
    "Asus",
    "Sony",
    "JBL",
    "Lenovo",
    "Google",
    "Garmin",
    "Xiaomi",
    "HP",
    "Bose",
    "Huawei"
  ];


  // Filter Products

  const filteredProducts = products.filter((product) => {

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand);

    return categoryMatch && brandMatch;

  });


  // Pagination

  const productsPerPage = 9;

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );


  // Reset Page When Filters Change

  useEffect(() => {

    setCurrentPage(1);

  }, [searchParams.toString(), selectedBrands]);


  // Category Filter

  const handleCategoryChange = (category) => {

    setSearchParams((prev) => {

      const params = new URLSearchParams(prev);

      const selected = params.getAll("category");

      params.delete("category");

      const updated = selected.includes(category)
        ? selected.filter((item) => item !== category)
        : [...selected, category];

      updated.forEach((item) => {
        params.append("category", item);
      });

      return params;

    });

  };


  // Brand Filter

  const handleBrandChange = (brand) => {

    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );

  };


  // Clear Filters

  const clearFilters = () => {

    setSearchParams({});

    setSelectedBrands([]);

    setCurrentPage(1);

  };


  // Loading

  if (loading) {

    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">

        <h2 className="text-xl font-bold text-yellow-500">
          Loading Products...
        </h2>

      </div>
    );

  }


  // Error

  if (error) {

    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-5">

        <h2 className="text-xl font-bold text-red-500 break-words">
          Error: {error}
        </h2>

      </div>
    );

  }


  return (

    <div className="bg-white dark:bg-zinc-950 min-h-screen overflow-x-hidden">

      {/* Shop Header */}

      <div className="w-full min-h-[210px] md:min-h-[260px] dark:bg-zinc-950 overflow-hidden flex items-center">

        <div className="w-full md:w-1/2 px-5 md:px-10 py-8">

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white">
            Sh<span className="text-yellow-500">o</span>p
          </h1>

          <h3 className="font-bold mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
            Discover the latest tech products at the best prices
          </h3>

          <div className="w-[100px] md:w-[130px] h-[6px] bg-yellow-500 mt-5 rounded-xl" />

        </div>

      </div>


      {/* Shop Content */}

      <div className="bg-gray-50 dark:bg-zinc-900 flex flex-col lg:flex-row gap-5 p-3 sm:p-5">


        {/* Sidebar */}

        <div className="w-full lg:w-[270px] lg:shrink-0 h-fit p-4 sm:p-5 bg-white dark:bg-zinc-800
          shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.08)]
          rounded-xl border border-gray-200 dark:border-zinc-700 lg:sticky lg:top-5">


          {/* Filter Header */}

          <div className="w-full h-[50px] flex items-center justify-center">

            <Funnel className="text-yellow-500" />

            <h2 className="dark:text-white font-bold text-xl ml-2">
              Filters
            </h2>

          </div>


          {/* Categories */}

          <div className="mt-4">

            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4">
              Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-gray-700 dark:text-gray-300">

              {shopCategories.map((category) => (

                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                >

                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="accent-yellow-500 w-4 h-4 shrink-0"
                  />

                  {category.name}

                </label>

              ))}

            </div>

          </div>


          <div className="bg-gray-200 dark:bg-zinc-700 w-full h-[2px] rounded-xl mt-6 mb-5" />


          {/* Brands */}

          <div>

            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4">
              Brands
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 text-gray-700 dark:text-gray-300">

              {brands.map((brand) => (

                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                >

                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="accent-yellow-500 w-4 h-4 shrink-0"
                  />

                  {brand}

                </label>

              ))}

            </div>

          </div>


          {/* Clear Filters */}

          <button
            onClick={clearFilters}
            className="w-full mt-6 p-2 rounded-lg border border-yellow-500
            text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors
            flex items-center justify-center gap-2"
          >

            <X size={16} />

            Clear Filters

          </button>

        </div>


        {/* Products Component */}

        <ShopProducts

          filteredProducts={filteredProducts}

          currentProducts={currentProducts}

          cart={cart}

          addToCart={addToCart}

          increaseQuantity={increaseQuantity}

          decreaseQuantity={decreaseQuantity}

          clearFilters={clearFilters}

          currentPage={currentPage}

          setCurrentPage={setCurrentPage}

          totalPages={totalPages}

        />

      </div>

    </div>

  );

};

export default ShopSection;
