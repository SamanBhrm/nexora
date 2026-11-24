import { useEffect, useState } from "react";
import { Package, Layers, ShoppingBag } from "lucide-react";

const AdminHome = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:5000/products"),
          fetch("http://localhost:5000/categories")
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package
    },
    {
      title: "Categories",
      value: categories.length,
      icon: Layers
    },
    {
      title: "Store Items",
      value: products.length + categories.length,
      icon: ShoppingBag
    }
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          Welcome to NEXORA
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Here's what's happening in your store.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{item.title}</p>
                  <h2 className="mt-3 text-3xl font-black text-zinc-900 dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-yellow-500/10 p-4 text-yellow-500">
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-5 text-lg font-bold text-zinc-900 dark:text-white">
          Recent Products
        </h2>

        <div className="space-y-4">
          {products.slice(-5).reverse().map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 dark:border-zinc-800">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {product.title}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {product.category}
                </p>
              </div>

              <span className="font-bold text-yellow-600 dark:text-yellow-500">
                ${Number(product.price || 0).toLocaleString()} 
              </span>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-sm text-zinc-500">No products found.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminHome