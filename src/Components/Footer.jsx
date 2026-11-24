import { useContext } from "react";
import { Link } from "react-router-dom";
import {Zap,Package,Headphones,Info,Mail,MapPin,ArrowRight,Copyright} from "lucide-react";
import { ProductContext } from "../Context/ProductContext.jsx";


const Footer = () => {

  const { shopCategories = [] } = useContext(ProductContext) || {};

  
  const uniqueCategories = [
    ...new Map(
      shopCategories
        .filter(
          (category) =>
            category?.name && category.name.trim() !== ""
        )
        .map((category) => [
          category.name.trim().toLowerCase(),
          category
        ])
    ).values()
  ];


  return (

    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">

    

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">


      

          <div>

            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">

              <Zap className="text-yellow-500 size-10" />

              <div>

                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  NEXORA
                </h1>

                <p className="text-xs text-zinc-500 tracking-widest">
                  PREMIUM TECH STORE
                </p>

              </div>

            </Link>

            <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400 max-w-[260px]">
              Discover the future of technology with premium electronics
              and innovative products designed for your lifestyle.
            </p>

          </div>


          
          <div>

            <div className="flex items-center gap-2 mb-6">

              <Package className="text-yellow-500 size-5" />

              <h3 className="font-bold text-zinc-900 dark:text-white">
                Products
              </h3>

            </div>


            <div className="flex flex-col gap-4 text-sm text-zinc-500 dark:text-zinc-400">

              {uniqueCategories.map((category) => (

                <Link
                  key={category.id ?? category.name}
                  to={`/shop?category=${encodeURIComponent(category.name.trim())}`}
                  className="hover:text-yellow-500 transition-colors w-fit"
                >

                  {category.name}

                </Link>

              ))}

              {uniqueCategories.length === 0 && (

                <p className="text-sm text-gray-400">
                  No categories available
                </p>

              )}

            </div>

          </div>


        

          <div>

            <div className="flex items-center gap-2 mb-6">

              <Info className="text-yellow-500 size-5" />

              <h3 className="font-bold text-zinc-900 dark:text-white">
                Company
              </h3>

            </div>


            <div className="flex flex-col gap-4 text-sm text-zinc-500 dark:text-zinc-400">

              <Link to="/" className="hover:text-yellow-500 transition-colors w-fit">
                Home
              </Link>

              <Link to="/shop" className="hover:text-yellow-500 transition-colors w-fit">
                Shop
              </Link>

              <Link to="/categories" className="hover:text-yellow-500 transition-colors w-fit">
                Categories
              </Link>

              <Link to="/account" className="hover:text-yellow-500 transition-colors w-fit">
                My Account
              </Link>

              <Link to="/wishlist" className="hover:text-yellow-500 transition-colors w-fit">
                Wishlist
              </Link>

            </div>

          </div>


          

          <div>

            <div className="flex items-center gap-2 mb-6">

              <Headphones className="text-yellow-500 size-5" />

              <h3 className="font-bold text-zinc-900 dark:text-white">
                Contact Us
              </h3>

            </div>


            <div className="flex flex-col gap-5 text-sm text-zinc-500 dark:text-zinc-400">

              <div className="flex items-center gap-3">

                <Mail className="size-4 text-yellow-500" />

                <p>support@nexora.com</p>

              </div>


              <div className="flex items-center gap-3">

                <MapPin className="size-4 text-yellow-500" />

                <p>Available Worldwide</p>

              </div>


              <Link
                to="/shop"
                className="flex items-center gap-2 text-yellow-500 hover:gap-3 transition-all w-fit"
              >

                Explore Products

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>


        </div>

      </div>


    

      <div className="border-t border-zinc-200 dark:border-zinc-800">

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">

            <Copyright size={14} />

            <p>2026 NEXORA. All rights reserved.</p>

          </div>


          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">

            <span>Privacy Policy</span>

            <div className="w-1 h-1 rounded-full bg-yellow-500" />

            <span>Terms of Service</span>

          </div>

        </div>

      </div>

    </footer>

  );

};

export default Footer
