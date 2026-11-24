import CartHeader from "../Components/Cart/CartHeader";
import CartContent from "../Components/Cart/CartContent";

const Cart = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <CartHeader />
      <CartContent />
    </main>
  );
};

export default Cart