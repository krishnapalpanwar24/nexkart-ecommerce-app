import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.category) {
      return alert("Please fill all required fields");
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

      alert("Product added successfully! ✅");
      setForm({ name: "", price: "", stock: "", category: "", description: "", image: "" });
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
    color: "#0f172a",
    background: "#f8fafc",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f172a",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div className="w-full pb-10 pr-6">

      
      <div className="mb-6">
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>
          Add New Product
        </h1>
       
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

       
        <div style={{ background: "#4f46e5", padding: "16px 24px" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700" }}>
            Product Details
          </h2>
        </div>

        <form onSubmit={submit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

          
          <div>
            <label style={labelStyle}>
              Product Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              style={inputStyle}
            />
          </div>

          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>
                Price (₹) <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 499"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Stock <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="e.g. 10"
                style={inputStyle}
              />
            </div>
          </div>

        
          <div>
            <label style={labelStyle}>
              Category <span style={{ color: "#ef4444" }}>*</span>
            </label>
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
            <label style={labelStyle}>
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={inputStyle}
            />

            
            {form.image ? (
              <div style={{ marginTop: "12px", border: "1.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", height: "160px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={form.image}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            ) : (
              <div style={{ marginTop: "12px", border: "1.5px dashed #cbd5e1", borderRadius: "12px", height: "120px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", gap: "8px" }}>
                <FaImage size={28} color="#94a3b8" />
                <p style={{ color: "#94a3b8", fontSize: "13px" }}>Image preview will appear here</p>
              </div>
            )}
          </div>

         
          <div>
            <label style={labelStyle}>
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

        
          <button
            disabled={loading}
            style={{
              background: loading ? "#818cf8" : "#4f46e5",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            <FaPlus size={14} />
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}