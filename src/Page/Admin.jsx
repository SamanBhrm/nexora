import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminHome from "../Components/Admin/AdminHome";
import AdminProducts from "../Components/Admin/AdminProducts";
import AdminCategories from "../Components/Admin/AdminCategories";
import AdminFooter from "../Components/Admin/AdminFooter";
import AdminLogin from "../Components/Admin/AdminLogin";

const Admin = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  if (!isLoggedIn) {
    return (
      <AdminLogin
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <AdminProducts />;

      case "categories":
        return <AdminCategories />;

      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">

      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="min-h-screen lg:pl-64 flex flex-col">

        <main className="p-5 md:p-8 flex-1">
          {renderPage()}
        </main>

        <AdminFooter />

      </div>
    </div>
  );
};

export default Admin