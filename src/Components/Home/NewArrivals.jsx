import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext.jsx";
import WishlistButton from "../Wishlist/WishListButton.jsx";

const NewArrivals = () => {

  const {
    products = [],
    newArrivals = [],
    loading,
    error
  } = useContext(ProductContext);

  console.log("Products:", products.length);
  console.log("New Arrivals:", newArrivals.length);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-white">
        Loading New Arrivals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products.
      </div>
    );
  }









  return (
    <section className="px-5 md:px-10 lg:px-16 py-16">

      <div>

      

        <div className="flex flex-wrap justify-between
          items-center gap-5 mb-10">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <p className="text-yellow-500 font-bold text-sm
                tracking-widest">
                JUST ARRIVED
              </p>

              <Sparkles className="text-yellow-500" size={20} />

            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold
              text-gray-900 dark:text-white">
              New Arrivals
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Discover our latest products and new technology.
            </p>

          </div>

          <Link
            to="/shop"
            className="flex items-center gap-2
              text-yellow-600 dark:text-yellow-400
              font-semibold hover:gap-4 transition-all duration-300"
          >
            View All
            <ArrowRight size={19} />
          </Link>

        </div>


        

        <div className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-4 gap-6">

          {newArrivals.map((product) => (










            <div
              key={product.id}
              className="group relative overflow-hidden
                rounded-2xl bg-gray-50 dark:bg-[#171717]
                border border-gray-200 dark:border-white/10
                hover:border-yellow-500/50
                hover:-translate-y-2
                transition-all duration-300"
            >

              

              <span className="absolute top-4 left-4 z-20
                bg-yellow-400 text-black text-xs
                font-bold px-3 py-1.5 rounded-full">
                {product.badge || "NEW"}
              </span>


              

              <div className="relative h-64 p-7
                flex items-center justify-center overflow-hidden">





<div className="absolute top-4 right-4 z-20 ">
  <WishlistButton product={product} />
</div>







                <div className="absolute w-40 h-40
                  bg-yellow-400/10 rounded-full
                  blur-3xl opacity-0
                  group-hover:opacity-100
                  transition-all duration-500" />





                <img
                  src={product.image}
                  alt={product.title}
                  className="relative z-10 w-full h-full
                    object-contain
                    group-hover:scale-110
                    transition-transform duration-500 rounded-xl"
                />





              </div>


            

              <div className="px-5 pb-5">

                <p className="text-yellow-600
                  dark:text-yellow-400 text-xs
                  font-semibold mb-2">
                  {product.category}
                </p>

                <h3 className="text-gray-900
                  dark:text-white font-bold text-base
                  min-h-12">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mt-3">

                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-gray-700
                    dark:text-gray-300 text-sm font-semibold">
                    {product.rating}
                  </span>

                  <span className="text-gray-400 text-xs">
                    Customer Rating
                  </span>

                </div>

                <div className="flex items-center gap-3 mt-4">

                  <span className="text-gray-900
                    dark:text-white text-xl font-extrabold">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-gray-400
                      text-sm line-through">
                      ${product.oldPrice}
                    </span>
                  )}

                </div>
                <Link
                  to="/shop"
                  className="mt-5 w-full flex items-center
                    justify-center gap-2
                    bg-gray-900 dark:bg-white
                    text-white dark:text-black
                    font-semibold py-3 rounded-xl
                    hover:bg-yellow-400
                    hover:text-black
                    transition-all duration-300"
                >
                  Explore Product
                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>

          ))}

        </div>

        {newArrivals.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No new arrivals available.
          </p>
        )}

      </div>

    </section>
  );
};

export default NewArrivals
