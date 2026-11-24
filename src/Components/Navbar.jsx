import { useContext, useMemo, useState } from "react";
import {Search,ShoppingCart,Heart,User,X,Menu} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext.jsx";
import { DarkOrLight } from "./DarkOrLight";




const SearchBox = ({
  query,
  setQuery,
  suggestions,
  isOpen,
  setIsOpen,
  onSearch,
  onSelect
}) => {

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e) => {

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }

    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0 && suggestions[activeIndex]) {
      e.preventDefault();
      onSelect(suggestions[activeIndex]);
      setActiveIndex(-1);
    }
  };

  return (

    <div
      className="relative w-full min-w-0"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }}
    >

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
          setActiveIndex(-1);
        }}
        className="flex w-full items-center rounded-xl
        border border-zinc-200 bg-zinc-100
        px-3 transition-all

        focus-within:border-amber-500
        focus-within:ring-2 focus-within:ring-amber-500/20

        dark:border-zinc-800 dark:bg-zinc-900"
      >

        <Search size={19} className="shrink-0 text-zinc-500" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          autoComplete="off"
          className="w-full min-w-0 bg-transparent
          px-3 py-3 text-sm text-zinc-900
          outline-none placeholder:text-zinc-500
          dark:text-white"
        />

        {query && (

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              setActiveIndex(-1);
            }}
            className="shrink-0 text-zinc-500
            transition hover:text-amber-500"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>

        )}

      </form>


      {isOpen && query.trim() && (

        <div
          className="absolute left-0 right-0 top-full z-[100]
          mt-2 max-h-[65vh] overflow-y-auto
          rounded-xl border border-zinc-200
          bg-white shadow-xl

          dark:border-zinc-700 dark:bg-zinc-900"
        >

          {suggestions.length > 0 ? (

            <>

              <p className="px-4 py-3 text-xs font-bold
              tracking-wider text-zinc-400">
                SUGGESTED PRODUCTS
              </p>

              {suggestions.map((product, index) => (

                <button
                  key={product.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSelect(product);
                    setActiveIndex(-1);
                  }}
                  className={`flex w-full items-center gap-3
                  px-3 sm:px-4 py-3 text-left transition-colors

                  ${
                    activeIndex === index
                      ? "bg-amber-500/10"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >

                  <img
                    src={
                      product.image ||
                      `https://placehold.co/100x100?text=${encodeURIComponent(product.title)}`
                    }
                    alt={product.title}
                    className="h-11 w-11 shrink-0 rounded-lg
                    bg-zinc-100 object-contain
                    dark:bg-zinc-800"
                  />

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold
                    text-zinc-900 dark:text-white">
                      {product.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {product.brand} · {product.category}
                    </p>

                  </div>

                  <span className="shrink-0 text-sm font-bold text-amber-500">
                    ${product.price}
                  </span>

                </button>

              ))}

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onSearch}
                className="w-full border-t border-zinc-200
                px-4 py-3 text-sm font-semibold
                text-amber-500 transition
                hover:bg-zinc-100

                dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                See all results for "{query}"
              </button>

            </>

          ) : (

            <div className="px-4 py-8 text-center">

              <Search size={25} className="mx-auto mb-3 text-zinc-400" />

              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                No products found
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Try another product name or brand
              </p>

            </div>

          )}

        </div>

      )}

    </div>

  );
};




const Navbar = () => {

  const { products = [] } = useContext(ProductContext) || {};

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  

  const suggestions = useMemo(() => {

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    return products
      .filter((product) => {

        return (
          product.title?.toLowerCase().includes(normalizedQuery) ||
          product.brand?.toLowerCase().includes(normalizedQuery) ||
          product.category?.toLowerCase().includes(normalizedQuery)
        );

      })
      .slice(0, 6);

  }, [products, query]);


  

  const handleSearch = () => {

    if (!query.trim()) return;

    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);

    setIsOpen(false);
    setIsMenuOpen(false);

  };


  

  const handleSelect = (product) => {

    navigate(`/shop?q=${encodeURIComponent(product.title)}`);

    setQuery(product.title);
    setIsOpen(false);
    setIsMenuOpen(false);

  };


  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
  ];


  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  return (

    <nav className="sticky top-0 z-50 w-full
    border-b border-zinc-200 bg-white text-zinc-900
    transition-colors duration-300

    dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">


      

      <div className="mx-auto flex max-w-7xl
      items-center justify-between gap-3
      px-4 py-3 sm:px-6 lg:gap-6">


      

        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-xl font-bold
          tracking-widest sm:text-2xl"
        >
          NEXORA<span className="text-amber-500">.</span>
        </Link>


        
        <div className="hidden lg:flex flex-1
        items-center justify-between gap-6">


          

          <div className="max-w-sm flex-1 xl:max-w-md">

            <SearchBox
              query={query}
              setQuery={setQuery}
              suggestions={suggestions}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSearch={handleSearch}
              onSelect={handleSelect}
            />

          </div>


          




















          <div className="flex shrink-0 items-center gap-5
          text-sm font-medium xl:gap-7">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className="whitespace-nowrap
                transition-colors hover:text-amber-500"
              >
                {link.name}
              </Link>

            ))}

          </div>

        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">


          

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="transition-colors hover:text-amber-500"
          >
            <Heart size={21} />
          </Link>


          <Link
            to="/cart"
            aria-label="Cart"
            className="transition-colors hover:text-amber-500"
          >
            <ShoppingCart size={21} />
          </Link>


          <Link
            to="/admin"
            aria-label="Account"
            className="hidden transition-colors
            hover:text-amber-500 lg:block"
          >
            <User size={21} />
          </Link>


          
          <DarkOrLight />


          

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center
            rounded-lg border border-zinc-200
            transition-colors hover:bg-zinc-100
            dark:border-zinc-800 dark:hover:bg-zinc-800

            lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >

            {isMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

          </button>

        </div>

      </div>


      

      <div className="mx-auto max-w-7xl
      px-4 pb-3 sm:px-6 lg:hidden">

        <SearchBox
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSearch={handleSearch}
          onSelect={handleSelect}
        />

      </div>


      

      {isMenuOpen && (

        <div className="border-t border-zinc-200
        bg-white px-4 py-4 shadow-lg
        dark:border-zinc-800 dark:bg-zinc-950
        lg:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-2">


            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3
                text-sm font-medium text-zinc-700
                transition-colors hover:bg-zinc-100
                hover:text-amber-500

                dark:text-zinc-200
                dark:hover:bg-zinc-900
                dark:hover:text-amber-500"
              >
                {link.name}
              </Link>

            ))}


            

            <Link
              to="/admin"
              onClick={closeMenu}
              className="flex items-center gap-3
              rounded-lg px-4 py-3 text-sm font-medium
              text-zinc-700 transition-colors
              hover:bg-zinc-100 hover:text-amber-500

              dark:text-zinc-200
              dark:hover:bg-zinc-900
              dark:hover:text-amber-500"
            >

              <User size={19} />

              Account

            </Link>

          </div>

        </div>

      )}

    </nav>

  );

};

export default Navbar