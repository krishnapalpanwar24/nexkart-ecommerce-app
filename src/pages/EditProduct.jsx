import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
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
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        alert("Product not found!");
        nav("/dashboard/all-products");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const storageRef = ref(storage, `products/${file.name}`);

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      setForm((prev) => ({
        ...prev,
        image: url,
      }));
    } catch (err) {
      alert(err.message);
    }

    setUploading(false);
  };

 
  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.category) {
      return alert("Please fill required fields");
    }

    if (uploading) {
      return alert("Image is still uploading...");
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

      alert("Product updated successfully");
      nav("/dashboard/all-products");
    } catch (err) {
      alert(err.message);
    }

    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">

     
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-3 rounded"
        />

       
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-3 rounded"
          />
        </div>

       
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

      
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-3 rounded"
        />

        {uploading && (
          <p className="text-orange-500 text-sm">Uploading image...</p>
        )}

       
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="h-40 object-contain border rounded"
          />
        )}

       
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded"
          rows={3}
        />

       
        <button
          disabled={saving}
          className="bg-indigo-600 text-white p-3 rounded flex items-center justify-center gap-2"
        >
          <FaSave />
          {saving ? "Saving..." : "Update Product"}
        </button>

      </form>
    </div>
  );
}