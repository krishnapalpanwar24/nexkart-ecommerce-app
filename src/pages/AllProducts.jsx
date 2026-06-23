import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const nav = useNavigate();

  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
    setDeletingId(null);
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div style={{ width: "100%", paddingRight: "24px", paddingBottom: "40px" }}>

      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>
            All Products
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            {products.length} products total
          </p>
        </div>

        
        <button
          onClick={() => nav("/dashboard/add-product")}
          style={{ background: "#4f46e5", color: "#fff", fontSize: "14px", fontWeight: "700", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer" }}
        >
          + Add Product
        </button>
      </div>

      
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <FaSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: "10px", padding: "12px 16px 12px 44px", fontSize: "14px", color: "#0f172a", background: "#fff", outline: "none" }}
        />
      </div>

      
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>No products found</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>

         
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px", gap: "16px", padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            {["Image", "Name", "Category", "Price", "Stock", "Actions"].map((h) => (
              <div key={h} style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: h === "Actions" ? "right" : "left" }}>
                {h}
              </div>
            ))}
          </div>

          
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{ display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px", gap: "16px", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}
            >
             
              <div>
                <img
                  src={product.image || "https://via.placeholder.com/40"}
                  alt={product.name}
                  style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                />
              </div>

             
              <div>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {product.name}
                </p>
              </div>

              
              <div>
                <span style={{ background: "#eef2ff", color: "#4f46e5", fontSize: "12px", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" }}>
                  {product.category}
                </span>
              </div>

             
              <div>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                  ₹{product.price}
                </p>
              </div>

             
              <div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: product.stock > 0 ? "#22c55e" : "#ef4444" }}>
                  {product.stock > 0 ? product.stock : "Out"}
                </span>
              </div>

              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  onClick={() => nav(`/dashboard/edit-product/${product.id}`)}
                  style={{ background: "#eef2ff", color: "#4f46e5", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  style={{ background: "#fef2f2", color: "#ef4444", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", opacity: deletingId === product.id ? 0.5 : 1 }}
                >
                  <FaTrash size={14} />
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}