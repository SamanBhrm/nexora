import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const API = "http://localhost:5000/categories";

const AdminCategories = () => {

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);






  
  const getCategories = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() })
      });

      if (!res.ok) throw new Error("Failed to add category");

      setTitle("");
      await getCategories();
    } catch (error) {
      alert("Error adding category");
      console.error(error);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete category");

      await getCategories();
    } catch (error) {
      alert("Error deleting category");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          Categories
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your product categories
        </p>
      </div>

      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">
                {category.title}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Category
              </p>
            </div>

            <button
              onClick={() => deleteCategory(category.id)}
              className="rounded-lg bg-red-500/10 p-2 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

      </div>

      {loading && <p className="text-zinc-500">Loading...</p>}

      {!loading && categories.length === 0 && (
        <p className="text-center text-zinc-500">
          No categories found.
        </p>
      )}

    </div>
  );
};

export default AdminCategories