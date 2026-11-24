import {BrowserRouter,Route,Routes,useLocation} from "react-router-dom";
import Home from "./Page/Home.jsx";
import Shop from "./Page/Shop.jsx";
import Categories from "./Page/Categories.jsx";
import Wishlist from "./Page/Wishlist.jsx";
import Cart from "./Page/Cart.jsx";
import Admin from "./Page/Admin";
import ProductDetails from "./Page/ProductDetails.jsx";
import Footer from "./Components/Footer.jsx";
import Navbar from "./Components/Navbar.jsx";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id"element={<ProductDetails />}/>
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}









function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App