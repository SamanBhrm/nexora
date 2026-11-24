import laptop from "../../assets/bg1.png";
import { Link } from "react-router-dom";
import laptop2 from "../../assets/nbg1.png";



const HeroSection = () => {
  return (
    <section className="min-h-[600px] bg-gray-100 text-zinc-900 transition-colors duration-500 dark:bg-[#080808] dark:text-white">

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-10 px-6 py-16 md:flex-row">

        <div className="w-full space-y-6 md:w-1/2">

          <h4 className="text-xs font-semibold tracking-[0.3em] text-yellow-600 dark:text-yellow-500">
            PREMIUM TECH STORE
          </h4>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Technology,
            <span className="block text-yellow-600 dark:text-yellow-500">
              Reimagined.
            </span>
          </h1>

          <p className="max-w-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover premium technology and elevate your
            digital lifestyle with our exclusive collection.
          </p>

          <Link
            to="/shop"
            className="inline-block rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Explore Products
          </Link>

        </div>

        <div className="flex w-full items-center justify-center md:w-1/2">

          <img
            src={laptop}
            alt="Premium Laptop"
            className="block w-full max-w-[600px] object-contain dark:hidden"
          />

          <img
            src={laptop2}
            alt="Premium Laptop"
            className="hidden w-full max-w-[600px] object-contain dark:block dark:mix-blend-screen"
          />

        </div>

      </div>
    </section>
  );
};

export default HeroSection
