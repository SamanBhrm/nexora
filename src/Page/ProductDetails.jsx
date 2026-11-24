import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ShoppingCart,Star,ArrowLeft,Heart,Truck, ShieldCheck} from "lucide-react";

const API = "http://localhost:5000/products";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);

      } catch (error) {

        setError("Unable to load product.");

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center
      text-black dark:text-white">
        Loading Product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center
      justify-center gap-4 text-black dark:text-white">

        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>

        <button
          onClick={() => navigate("/shop")}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg"
        >
          Back to Shop
        </button>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950
    text-black dark:text-white px-4 sm:px-8 py-10">

      <div className="max-w-7xl mx-auto">

        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8
          text-gray-500 hover:text-yellow-500 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10
        bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-8
        border border-gray-200 dark:border-zinc-800">

        
          <div className="bg-gray-100 dark:bg-zinc-800
          rounded-xl flex items-center justify-center p-8 min-h-[350px]">

            <img
              src={
                product.image ||
                `https://placehold.co/600x400?text=${encodeURIComponent(product.title)}`
              }
              alt={product.title}
              className="w-full h-[350px] object-contain"
            />

          </div>

          
          <div className="flex flex-col justify-center">

            <p className="text-yellow-500 font-semibold uppercase text-sm">
              {product.category}
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold mt-3">
              {product.title}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Brand: {product.brand}
            </p>

            
            <div className="flex items-center gap-2 mt-5">

              <Star
                size={20}
                fill="currentColor"
                className="text-yellow-500"
              />

              <span className="font-bold">
                {product.rating || "No rating"}
              </span>

            </div>

            
            <div className="flex items-center gap-4 mt-7">

              <span className="text-yellow-500 text-3xl font-bold">
                ${product.price}
              </span>

              {product.oldPrice > product.price && (
                <span className="text-gray-400 line-through text-lg">
                  ${product.oldPrice}
                </span>
              )}

            </div>

          
            <div className="mt-7">

              <h3 className="font-bold text-lg mb-2">
                Product Description
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-7">
                {product.description || "No description available for this product."}
              </p>

            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                onClick={() => navigate("/cart")}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400
                text-black font-bold rounded-xl p-4
                flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ShoppingCart size={20} />
                View Cart
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="p-4 rounded-xl border border-gray-300
                dark:border-zinc-700 hover:border-yellow-500
                transition flex items-center justify-center"
              >
                <Heart size={22} />
              </button>

            </div>

            
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="flex items-center gap-2 text-sm
              text-gray-500 dark:text-gray-400">

                <Truck className="text-yellow-500" />
                Fast Delivery

              </div>

              <div className="flex items-center gap-2 text-sm
              text-gray-500 dark:text-gray-400">

                <ShieldCheck className="text-yellow-500" />
                Quality Guarantee

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductDetails