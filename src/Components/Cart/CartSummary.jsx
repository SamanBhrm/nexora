import { useCart } from "../../Context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CartSummary = () => {

  const { cart, totalPrice, totalItems } = useCart();

  return (
    <div className="bg-white dark:bg-zinc-900
    border border-gray-200 dark:border-zinc-800
    rounded-2xl p-6 h-fit">

      <h2 className="text-xl font-bold text-black dark:text-white mb-6">
        Order Summary
      </h2>

      <div className="flex justify-between mb-4 text-gray-500 dark:text-gray-400">
        <span>Subtotal ({totalItems} items)</span>
        <span>${totalPrice.toLocaleString()}</span>
      </div>

      <div className="flex justify-between mb-4 text-gray-500 dark:text-gray-400">
        <span>Shipping</span>
        <span className="text-green-500 font-semibold">
          Free
        </span>
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-700 pt-5 mt-5">

        <div className="flex justify-between items-center mb-6">

          <span className="font-bold text-lg text-black dark:text-white">
            Total
          </span>

          <span className="text-yellow-500 font-bold text-2xl">
            ${totalPrice.toLocaleString()}
          </span>

        </div>

        <button
          disabled
          className="w-full bg-yellow-500 text-black
          font-bold py-3 rounded-xl opacity-70
          cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingBag size={19} />
          Checkout Coming Soon
        </button>

      </div>

      <Link
        to="/shop"
        className="flex justify-center items-center gap-2
        mt-5 text-sm text-gray-500 hover:text-yellow-500 transition"
      >
        Continue Shopping
        <ArrowRight size={16} />
      </Link>

    </div>
  );
};

export default CartSummary
