import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { FaPlus, FaImage } from "react-icons/fa";

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

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      return alert("Please fill all required fields");
    }

    if (uploading) {
      return alert("Image is still uploading...");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description,
        image: form.image,
        createdAt: new Date().toISOString(),
      });

      alert("Product added successfully!");

      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: "",
      });
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    background: "#f8fafc",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div className="w-full pb-10 pr-6">

      <h1 style={{ fontSize: "26px", fontWeight: "800" }}>
        Add New Product
      </h1>

      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}
      >

       
        <div>
          <label style={labelStyle}>Product Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

       
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Price *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Stock *</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

       
        <div>
          <label style={labelStyle}>Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

       
        <div>
          <label style={labelStyle}>Product Image *</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={inputStyle}
          />

          {uploading && (
            <p style={{ color: "orange", marginTop: "5px" }}>
              Uploading image...
            </p>
          )}

          {form.image && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={form.image}
                alt="preview"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}
        </div>

        
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={inputStyle}
          />
        </div>

      
        <button
          disabled={loading}
          style={{
            background: "#4f46e5",
            color: "#fff",
            padding: "14px",
            borderRadius: "12px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          <FaPlus /> {loading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}