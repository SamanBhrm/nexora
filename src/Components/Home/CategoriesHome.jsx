import { useContext } from "react";
import {Laptop, Smartphone,Headphones,Watch,ArrowUpRight,Sparkles} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext.jsx";

const CategoriesHome = () => {

  const { categories = [], loading, error } =
    useContext(ProductContext) || {};

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category.title.trim())}`);
  };

  
  const handleViewAll = () => {
    navigate("/shop");
  };

  if (loading) {
    return (
      <div className="py-20 text-center bg-gray-100 dark:bg-[#080808]">
        <h2 className="text-yellow-500 font-bold">
          Loading Categories...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center bg-gray-100 dark:bg-[#080808]">
        <h2 className="text-red-500 font-bold">
          {error}
        </h2>
      </div>
    );
  }






















  return (
    <section className="relative overflow-hidden bg-gray-100 px-4 sm:px-6 py-16 sm:py-24 text-zinc-900 transition-colors duration-500 dark:bg-[#080808] dark:text-white">

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

      

        <div className="mb-12 sm:mb-16 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-5 py-2">

            <Sparkles size={15} className="text-yellow-500" />

            <span className="text-xs font-semibold tracking-[0.2em] text-yellow-600 dark:text-yellow-500">
              EXPLORE OUR STORE
            </span>

          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Our{" "}
            <span className="text-yellow-600 dark:text-yellow-500">
              Categories
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Discover premium tech products across our top categories.
          </p>

        </div>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

          {categories.map((category, index) => {

            const Icon =
              category.icon === "Laptop" ? Laptop :
              category.icon === "Smartphone" ? Smartphone :
              category.icon === "Headphones" ? Headphones :
              Watch;

            return (

              <div
                key={category.id}
                className="group relative isolate min-h-[350px] sm:min-h-[390px] overflow-hidden rounded-3xl border border-zinc-300 bg-white p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 hover:shadow-[0_15px_50px_rgba(234,179,8,0.12)] dark:border-white/10 dark:bg-[#111111]"
              >

                <div className="absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl transition-all duration-500 group-hover:bg-yellow-500/25" />

                <div className="absolute -bottom-24 -right-24 -z-10 h-64 w-64 rotate-[-35deg] rounded-full border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-700 group-hover:scale-125 group-hover:border-yellow-400" />

                

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-600">
                    CATEGORY / {category.number || String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-zinc-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-500"
                  />

                </div>

              

                <div className="mt-12 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black dark:text-yellow-500">

                  <Icon size={27} strokeWidth={1.7} />

                </div>

              

                <div className="mt-7">

                  <h3 className="text-xl sm:text-2xl font-bold transition-colors group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {category.description}
                  </p>

                </div>

                

                <button
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-zinc-100 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black dark:border-white/10 dark:bg-white/5"
                >
                  Shop Now
                  <ArrowUpRight size={16} />
                </button>

                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              </div>

            );
          })}

        </div>

    
        <div className="mt-14 flex justify-center">

          <button
            type="button"
            onClick={handleViewAll}
            className="group flex items-center gap-3 rounded-full border border-yellow-500/50 px-6 sm:px-8 py-4 text-sm font-semibold text-yellow-700 transition-all duration-300 hover:bg-yellow-500 hover:text-black dark:text-yellow-500"
          >
            View All Categories

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </button>

        </div>

      </div>
    </section>
  );
};

export default CategoriesHome