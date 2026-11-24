import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {

  return (
    <div className="min-h-[450px] flex flex-col
    items-center justify-center text-center
    bg-white dark:bg-zinc-900
    border border-gray-200 dark:border-zinc-800
    rounded-2xl p-8">

      <div className="w-24 h-24 rounded-full
      bg-yellow-500/10 flex items-center
      justify-center mb-6">

        <ShoppingBag
          size={45}
          className="text-yellow-500"  />

      </div>

      <h2 className="text-2xl font-bold
      text-black dark:text-white mb-3">
        Your Cart Is Empty
      </h2>

      <p className="text-gray-500 dark:text-gray-400
      max-w-sm mb-7">
        Looks like you haven't added anything to
        your cart yet. Explore our premium products!
      </p>

      <Link
        to="/shop"
        className="bg-yellow-500 hover:bg-yellow-400
        text-black font-bold px-7 py-3 rounded-xl
        flex items-center gap-2 transition"
      >
        Explore Products
        <ArrowRight size={18} />
      </Link>

    </div>
  );
};

export default EmptyCart