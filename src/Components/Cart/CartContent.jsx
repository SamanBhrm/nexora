import { useCart } from "../../Context/CartContext";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const CartContent = () => {

  const { cart } = useCart();

  return (

    <section className="px-4 sm:px-8 pb-16">

      <div className="max-w-7xl mx-auto">

        {cart.length === 0 ? (

          <EmptyCart />

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <CartItems />
            </div>

            <div>
              <CartSummary />
            </div>

          </div>

        )}

      </div>

    </section>

  );
};

export default CartContent