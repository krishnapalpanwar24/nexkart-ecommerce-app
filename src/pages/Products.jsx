import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { FaSearch } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

       
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
            All Products
          </h1>
          <p style={{ fontSize: "15px", color: "#64748b" }}>
            {filtered.length} products found
          </p>
        </div>

       
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <FaSearch style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "16px" }} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: "14px", padding: "14px 18px 14px 48px", fontSize: "15px", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          />
        </div>

      
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                background: selectedCategory === cat ? "#4f46e5" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#64748b",
                borderColor: selectedCategory === cat ? "#4f46e5" : "#e2e8f0",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

       
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "18px", color: "#94a3b8" }}>No products found 😕</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}