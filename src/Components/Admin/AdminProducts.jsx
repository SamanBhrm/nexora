import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, X, Save } from "lucide-react";

const API = "http://localhost:5000/products";

const emptyForm = {
  title: "",
  price: "",
  category: "",
  image: "",
  description: ""
};

const AdminProducts = () => {

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price)
    };

    try {
      const res = editingId
        ? await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
          })
        : await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
          });

      if (!res.ok) throw new Error("Failed to save product");

      await getProducts();
      closeForm();
    } catch (error) {
      alert("Error saving product");
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await getProducts();
    } catch (error) {
      alert("Error deleting product");
      console.error(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title || "",
      price: product.price ?? "",
      category: product.category || "",
      image: product.image || "",
      description: product.description || ""
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
            Products
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your store products
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-400"
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <button onClick={closeForm}>
              <X className="text-zinc-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="min-h-24 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white sm:col-span-2"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 p-3 font-bold text-black hover:bg-yellow-400 sm:col-span-2"
            >
              <Save size={18} />
              {editingId ? "Save Changes" : "Add Product"}
            </button>

          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-zinc-100 text-xs uppercase text-zinc-500 dark:bg-zinc-800">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 rounded-lg bg-zinc-100 object-contain dark:bg-zinc-800"
                        />
                      )}
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-sm text-zinc-500">
                    {product.category}
                  </td>

                  <td className="p-4 text-sm font-bold text-yellow-600 dark:text-yellow-500">
                    ${Number(product.price || 0).toLocaleString()} 
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => editProduct(product)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit size={19} />
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="p-6 text-center text-zinc-500">Loading...</p>}

          {!loading && products.length === 0 && (
            <p className="p-8 text-center text-zinc-500">
              No products found.
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminProducts