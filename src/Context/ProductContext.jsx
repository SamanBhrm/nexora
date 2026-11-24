import { createContext, useEffect, useState } from "react";
import { getStoreData } from "../Services/productService";

export const ProductContext = createContext();



export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shopCategories, setShopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {

    const getData = async () => {

      try {

        const data = await getStoreData();

        setProducts(data.products);
        setCategories(data.categories);
        setShopCategories(data.shopCategories);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();

  }, []);

  
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const addToWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  
  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((id) => id !== productId)
    );
  };

  
  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const featuredProducts = products.filter(
    (product) => product.isFeatured
  );

const newArrivalIds = [28, 51, 52, 53];

const newArrivals = products.filter((product) =>
  newArrivalIds.includes(Number(product.id))
);
  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        shopCategories,
        featuredProducts,
        newArrivals,
        loading,
        error,

        




        
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
