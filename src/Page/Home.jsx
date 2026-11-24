import CategoriesHome from "../Components/Home/CategoriesHome.jsx";
import Featuresproducts from "../Components/Home/Featuredproducts.jsx";
import HeroSection from "../Components/Home/HeroSection.jsx";
import NewArrivals from "../Components/Home/NewArrivals.jsx";
import SpecialOffers from "../Components/Home/SpecialOffers.jsx";

const Home = () => {
  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      
      {/*Hero Section  */}
      <HeroSection />
      {/* Categories */}
      <CategoriesHome />
      {/*Features Products  */}
      <Featuresproducts />
      {/* Special Offers */}
      <SpecialOffers />
      {/* New Arrivalss */}
      <NewArrivals />
      </main>
  );
};

export default Home;