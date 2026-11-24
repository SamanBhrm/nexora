import { useCart } from "../../Context/CartContext";
import {Plus,Minus,Trash2,ShoppingCart,} from "lucide-react";

const CartItems = () => {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="space-y-4">

      {cart.map((product) => (

        <div
          key={product.id}
          className="bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
          rounded-2xl p-4 sm:p-5
          flex flex-col sm:flex-row items-center gap-5"
        >

          

          <img
            src={product.image}
            alt={product.title}
            className="w-28 h-28 object-contain"  />

        

          <div className="flex-1 w-full">

            <h2 className="font-bold text-black dark:text-white text-base">
              {product.title}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {product.brand}
            </p>

            <p className="text-yellow-500 font-bold mt-3">
              ${product.price}
            </p>

          </div>

          
          <div className="flex items-center gap-3">

            <button
              onClick={() => decreaseQuantity(product.id)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800
              text-black dark:text-white hover:bg-yellow-500 transition"
            >
              <Minus size={16} />
            </button>

            <span className="font-bold text-black dark:text-white min-w-5 text-center">
              {product.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(product.id)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800
              text-black dark:text-white hover:bg-yellow-500 transition"
            >
              <Plus size={16} />
            </button>

          </div>

          

          <p className="font-bold text-black dark:text-white">
            ${(product.price * product.quantity).toLocaleString()}
          </p>

          

          <button
            onClick={() => removeFromCart(product.id)}
            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
            title="Remove Product"
          >
            <Trash2 size={20} />
          </button>

        </div>








      ))}

    </div>
  );
};

export default CartItems
