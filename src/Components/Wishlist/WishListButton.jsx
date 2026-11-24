import { Heart } from "lucide-react";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

const WishlistButton = ({ product }) => {

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useContext(ProductContext);

  const isFavorite = isInWishlist(product.id);

  const handleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      aria-label="Toggle wishlist"
      className="rounded-full p-2 transition hover:scale-110"
    >
      <Heart
        size={21}
        className={
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-500 hover:text-red-500 fill-gray-200"
        }
      />
    </button>
  );
};

export default WishlistButton;
