import { ShoppingCart } from "lucide-react";
import { useCart } from "../../Context/CartContext";

const CartHeader = () => {

  const { totalItems } = useCart();

  return (
    <section className="px-4 sm:px-8 pt-12 pb-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl
          bg-yellow-500/10 flex items-center justify-center">

            <ShoppingCart
              size={28}
              className="text-yellow-500"
            />

          </div>

          <div>

            <h1 className="text-3xl sm:text-4xl
            font-extrabold text-zinc-900 dark:text-white">
              Shopping Cart
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Review your selected products
            </p>

          </div>

        </div>

        <div className="mt-7 border-b
        border-gray-200 dark:border-zinc-800 pb-5">

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-yellow-500 font-bold">
              {totalItems}
            </span>
            {" "}items in your cart
          </p>

        </div>

      </div>

    </section>
  );
};

export default CartHeader