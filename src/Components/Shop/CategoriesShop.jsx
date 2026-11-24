import { useContext } from "react";
import {Laptop,Smartphone,Headphones,Watch,ArrowRight,Gamepad2} from "lucide-react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext.jsx";

const CategoriesShop = () => {

  const {
    shopCategories,
    loading,
    error
  } = useContext(ProductContext);

  const iconMap = {
    Laptop,
    Smartphone,
    Headphones,
    Watch,
    Gamepad2
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <h2 className="text-yellow-500 font-bold text-xl">
          Loading Categories...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <h2 className="text-red-500 font-bold">
          {error}
        </h2>
      </div>
    );
  }

  return (

    <div className="bg-white dark:bg-zinc-950 min-h-screen">

  

      <div className="w-full h-[260px] dark:bg-zinc-950 overflow-hidden">

        <div className="w-1/2">

          <h1 className="text-7xl p-5 font-bold text-black dark:text-white">
            Cate<span className="text-yellow-500">g</span>ories
          </h1>

          <h3 className="font-bold p-5 text-gray-600 dark:text-gray-400">
            Explore our wide range of premium technology products
          </h3>

          <div className="w-[130px] h-[6px] bg-yellow-500 m-5 rounded-xl" />

        </div>

      </div>

      

      <div className="bg-white dark:bg-zinc-900 p-10">

      

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-black dark:text-white">
            Explore Categories
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Find the perfect technology for your needs.
          </p>

        </div>

        

        <div className="grid grid-cols-2 gap-6">

          {shopCategories.map((category) => {

            const Icon = iconMap[category.icon] || Laptop;

            return (

              <div
                key={category.id}
                className="bg-gray-50 dark:bg-zinc-800
                border border-gray-200 dark:border-zinc-700
                rounded-xl p-8 shadow-sm
                flex flex-col items-center text-center
                transition-colors hover:border-yellow-500"
              >

              

                <div className="w-[90px] h-[90px] rounded-full
                  bg-yellow-100 dark:bg-zinc-900
                  flex items-center justify-center mb-5">

                  <Icon
                    size={42}
                    className="text-yellow-500"
                  />

                </div>

                
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {category.name}
                </h2>

                

                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  {category.description}
                </p>

              

     <Link
  to={`/shop?category=${encodeURIComponent(category.name)}`}
  className="mt-6 flex items-center gap-2
  bg-yellow-500 hover:bg-yellow-400
  text-black font-semibold
  px-5 py-2 rounded-lg transition-colors"
>
  Explore Products
  <ArrowRight size={18} />
</Link>
              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

};

export default CategoriesShop;
