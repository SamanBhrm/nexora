import { useContext, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { ProductContext } from "../../Context/ProductContext.jsx";

const Featuresproducts = () => {


  const { featuredProducts, loading, error } = useContext(ProductContext);

  const [activeIndex, setActiveIndex] = useState(0);

  
  useEffect(() => {

    if (featuredProducts.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(timer);

  }, [featuredProducts.length]);

  
  if (loading) {
    return (
      <section className="py-20 dark:bg-[#080808] text-center">
        <h2 className="text-yellow-500 font-bold text-xl">
          Loading Featured Products...
        </h2>
      </section>
    );
  }


  if (error) {
    return (
      <section className="py-20 dark:bg-[#080808] text-center">
        <h2 className="text-red-500 font-bold">
          {error}
        </h2>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (

    <section className="py-20 overflow-hidden bg-white dark:bg-[#080808]">

      

      <div className="text-center mb-16">

        <h1 className="text-black dark:text-white text-4xl font-bold">
          Featured Products
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          Discover our most popular products
        </p>

      </div>

      

      <div className="relative h-[520px] w-full">

        {featuredProducts.map((product, index) => {

          let offset =
            (index - activeIndex + featuredProducts.length) %
            featuredProducts.length;

          if (offset > featuredProducts.length / 2) {
            offset -= featuredProducts.length;
          }

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          if (!isVisible) return null;

          return (

            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className={`
                absolute top-1/2
                w-[320px] sm:w-[350px]
                h-[440px]
                rounded-3xl
                border border-gray-200 dark:border-white/20
                p-6
                flex flex-col items-center
                cursor-pointer
                transition-all duration-700 ease-in-out
                ${isActive
                  ? "bg-gray-100 dark:bg-[#20232b] shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
                  : "bg-gray-50 dark:bg-[#14161c]"
                }
              `}
              style={{
                left: `calc(50% + ${offset * 300}px)`,
                transform: `
                  translate(-50%, -50%)
                  scale(${isActive ? 1 : 0.72})
                `,
                opacity: isActive ? 1 : 0.45,
                zIndex: isActive ? 10 : 5,
              }}
            >

              

              <span className="bg-yellow-500 text-black text-xs font-bold px-4 py-1 rounded-full self-start">
                {product.badge || "Featured"}
              </span>

            
              <div className="w-full h-[230px] flex items-center justify-center">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-[220px] h-[220px] object-contain rounded-xl"
                />

              </div>

            

              <h3 className="text-black dark:text-white font-bold text-xl text-center">
                {product.title}
              </h3>

            

              <div className="text-yellow-500 mt-3 flex items-center gap-1">

                <Star size={18} fill="currentColor" />

                {product.rating}

              </div>

      
              <div className="flex gap-3 items-center mt-3">

                <span className="text-black dark:text-white font-bold text-xl">
                  ${product.price}
                </span>

                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>

              </div>

            

              <button className="w-full mt-auto bg-yellow-500 text-black rounded-xl py-3 font-bold hover:bg-yellow-400 transition">
                Add To Cart
              </button>

            </div>

          );

        })}

      </div>

      

      <div className="flex justify-center gap-3 mt-5">

        {featuredProducts.map((product, index) => (

          <button
            key={product.id}
            onClick={() => setActiveIndex(index)}
            className={`
              h-2 rounded-full transition-all duration-500
              ${activeIndex === index
                ? "w-10 bg-yellow-400"
                : "w-2 bg-gray-600"
              }
            `}
          />

        ))}

      </div>

    </section>

  );

};

export default Featuresproducts
