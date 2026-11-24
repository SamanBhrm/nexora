import { useCart } from "../../Context/CartContext";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistProducts = () => {


const {
  products,
  wishlist,
  removeFromWishlist,
  loading
} = useContext(ProductContext);

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );




const { addToCart } = useCart();







  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-16 text-zinc-900 dark:text-white">

      
      <div className="mb-12">
        <div className="mb-3 flex items-center gap-3">
          <Heart className="fill-red-500 text-red-500" size={30} />

          <h1 className="text-3xl font-bold">
            My Wishlist
          </h1>
        </div>

        <p className="text-gray-500">
          Your favorite products, all in one place.
        </p>

        <p className="mt-3 text-sm text-yellow-500">
          {wishlistProducts.length} Products Saved
        </p>
      </div>

      
      {wishlistProducts.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <Heart size={65} className="mb-5 text-gray-400" />

          <h2 className="text-2xl font-bold">
            Your Wishlist is Empty
          </h2>

          <p className="mt-3 text-gray-500">
            Explore our store and save your favorite products.
          </p>

          <Link
            to="/shop"
            className="mt-7 rounded-xl bg-yellow-500 px-7 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Explore Products
          </Link>

        </div>





      ) : (

        


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {wishlistProducts.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >

              <div className="relative flex h-52 items-center justify-center rounded-xl bg-gray-50 dark:bg-zinc-800">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-4"
                />

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-500 shadow transition hover:bg-red-500 hover:text-white dark:bg-zinc-950"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>

              </div>

              <div className="pt-5">

                <h3 className="font-semibold">
                  {product.title}
                </h3>

                <p className="mt-3 text-lg font-bold text-yellow-500">
                  ${product.price}
                </p>

                <button
 
 onClick={() => {
  console.log("Clicked:", product);
  addToCart(product);
}}
  className="bg-yellow-500 hover:bg-yellow-400
  transition-colors p-2 rounded-lg mt-4 w-full
  flex items-center justify-center gap-2
  text-black font-semibold text-sm sm:text-base"
>
  <ShoppingCart  size={18}  />
  Add to Cart
</button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
};

export default WishlistProducts
