import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSave } from "react-icons/fa";
import Loader from "../components/Loader";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Footwear",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Toys",
  "Other",
];

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  // ✅ Firestore  existing product fetch 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            name: data.name || "",
            price: data.price || "",
            stock: data.stock || "",
            category: data.category || "",
            description: data.description || "",
            image: data.image || "",
          });
        } else {
          alert("Product not found!");
          nav("/dashboard/all-products");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Firestore mein update karo
  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.category) {
      return alert("Please fill all required fields");
    }

    setSaving(true);
    try {
      await updateDoc(doc(db, "products", id), {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description,
        image: form.image,
        updatedAt: new Date().toISOString(),
      });

      alert("Product updated successfully! ✅");
      nav("/dashboard/all-products");
    } catch (err) {
      alert(err.message);
    }
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">

      
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={() => nav("/dashboard/all-products")}
          className="text-gray-400 hover:text-indigo-600 transition text-sm"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        Product details update karo
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <form onSubmit={submit} className="flex flex-col gap-4">

        
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50"
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">
                Price (₹) <span className="text-red-400">*</span>
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 499"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">
                Stock <span className="text-red-400">*</span>
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50"
              />
            </div>
          </div>

          
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50"
            />
            
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-3 h-32 object-contain rounded-xl border border-gray-200"
                onError={(e) => e.target.style.display = "none"}
              />
            )}
          </div>

         
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 bg-gray-50 resize-none"
            />
          </div>

          
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => nav("/dashboard/all-products")}
              className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition text-sm"
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <FaSave size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}