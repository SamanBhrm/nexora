import {ShoppingCart,Star,ChevronLeft,ChevronRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WishlistButton from "../Wishlist/WishListButton";

const ShopProducts = ({
  filteredProducts,
  currentProducts,
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearFilters,
  currentPage,
  setCurrentPage,
  totalPages
}) => {

  const navigate = useNavigate();

  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex-1 min-w-0 p-2 sm:p-5">

      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">

        <h2 className="text-xl font-bold text-black dark:text-white">
          {filteredProducts.length} Products
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Showing {currentProducts.length} Products
        </p>

      </div>

      
      {currentProducts.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

          {currentProducts.map((product) => {

            const cartItem = cart.find(
              (item) => item.id === product.id
            );

            return (

              <div
                key={product.id}
                onClick={() => openProduct(product.id)}
                className="relative min-w-0 bg-white dark:bg-zinc-800 rounded-xl p-4 sm:p-5
                shadow-md border border-gray-200 dark:border-zinc-700
                flex flex-col animate-[fadeUp_0.6s_ease-out]
                cursor-pointer hover:shadow-xl hover:-translate-y-1
                transition-all duration-300"
              >

                
                <img
                  src={
                    product.image ||
                    `https://placehold.co/600x400/f4f4f5/18181b?text=${encodeURIComponent(product.title)}`
                  }
                  alt={product.title}
                  className="w-full h-[160px] sm:h-[170px] object-contain rounded-xl"
                />

                
                <div
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WishlistButton product={product} />
                </div>

                
                <h2 className="text-black dark:text-white font-bold mt-3 min-h-[48px] text-sm sm:text-base">
                  {product.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {product.brand}
                </p>

                <p className="text-yellow-500 flex items-center gap-1 mt-2">
                  <Star size={16} fill="currentColor" />
                  {product.rating}
                </p>

                
                <div className="flex gap-3 mt-3 items-center flex-wrap">

                  <span className="text-yellow-500 font-bold">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.oldPrice}
                    </span>
                  )}

                </div>

            
                <div onClick={(e) => e.stopPropagation()}>

                  {cartItem ? (

                    <div className="flex items-center justify-between mt-4 w-full
                    bg-gray-100 dark:bg-zinc-900 rounded-lg p-2">

                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-zinc-700
                        hover:bg-gray-300 dark:hover:bg-zinc-600
                        transition-colors text-black dark:text-white
                        font-bold text-xl cursor-pointer"
                      >
                        −
                      </button>

                      <span className="font-bold text-black dark:text-white text-lg">
                        {cartItem.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="w-9 h-9 rounded-lg bg-yellow-500
                        hover:bg-yellow-400 transition-colors
                        text-black font-bold text-xl cursor-pointer"
                      >
                        +
                      </button>

                    </div>

                  ) : (

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-yellow-500 hover:bg-yellow-400
                      transition-colors p-2 rounded-lg mt-4 w-full
                      flex items-center justify-center gap-2
                      text-black font-semibold text-sm sm:text-base
                      cursor-pointer"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      ) : (

        <div className="w-full py-20 text-center">

          <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400">
            No Products Found
          </h2>

          <button
            onClick={clearFilters}
            className="mt-4 text-yellow-500 font-bold"
          >
            Clear Filters
          </button>

        </div>

      )}

      
      {totalPages > 1 && (

        <div
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-10"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-lg border border-gray-300 dark:border-zinc-700
            text-black dark:text-white disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (

            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold transition-colors
                ${currentPage === page
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-white"
                }`}
            >
              {page}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-lg border border-gray-300 dark:border-zinc-700
            text-black dark:text-white disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      )}

    </div>
  );
};

export default ShopProducts