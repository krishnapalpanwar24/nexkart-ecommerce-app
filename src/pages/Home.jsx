import { NavLink } from "react-router-dom";
import { FaShoppingBag, FaTruck, FaLock, FaUndo, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

      
      <div style={{
        background: "linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #6366f1 100%)",
        width: "100%", padding: "90px 48px", boxSizing: "border-box", textAlign: "center"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>

          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.15)",
            color: "white", fontSize: "13px", fontWeight: "500",
            padding: "6px 16px", borderRadius: "20px", marginBottom: "24px"
          }}>
            🛍️ India's Fastest Growing Storessssss
          </div>

          <h1 style={{
            fontSize: "52px", fontWeight: "800", color: "white",
            margin: "0 0 20px", lineHeight: "1.15"
          }}>
            Welcome to <span style={{ color: "#facc15" }}>Nexkart</span>
          </h1>

          <p style={{
            fontSize: "18px", color: "#c7d2fe", margin: "0 auto 40px",
            lineHeight: "1.7", maxWidth: "500px"
          }}>
            Discover amazing products at unbeatable prices. Shop smart, shop fast!
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
            <NavLink to="/products" style={{
              background: "#facc15", color: "#1e1b4b", fontWeight: "700",
              padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none"
            }}>
              Shop Now →
            </NavLink>
            <NavLink to="/register" style={{
              background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.5)",
              color: "white", fontWeight: "600", padding: "14px 36px",
              borderRadius: "12px", fontSize: "16px", textDecoration: "none"
            }}>
              Register Free
            </NavLink>
          </div>

       
          <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
            {[
              { val: "10K+", label: "Products" },
              { val: "50K+", label: "Happy Customers" },
              { val: "4.8★", label: "Rating" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "white" }}>{s.val}</div>
                <div style={{ fontSize: "13px", color: "#a5b4fc" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#1f2937", margin: "0 0 12px" }}>
            Why Shop With Us?
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
            Everything you need, delivered to your door
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { emoji: "🚚", title: "Free Delivery", desc: "Free shipping on all orders above ₹500" },
            { emoji: "🔒", title: "Secure Payment", desc: "100% safe and secure checkout" },
            { emoji: "↩️", title: "Easy Returns", desc: "7 day hassle free return policy" },
          ].map((f) => (
            <div key={f.title} style={{
              background: "white", border: "1px solid #e5e7eb",
              borderRadius: "20px", padding: "36px 24px", textAlign: "center",
              boxShadow: "0 2px 12px rgba(79,70,229,0.06)"
            }}>
              <div style={{
                width: "64px", height: "64px", background: "#eef2ff",
                borderRadius: "16px", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 20px", fontSize: "28px"
              }}>
                {f.emoji}
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#1f2937", margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: "1.6" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div style={{ margin: "0 32px 48px", background: "#1e1b4b", borderRadius: "24px", padding: "56px 32px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🛍️</div>
        <h2 style={{ fontSize: "30px", fontWeight: "800", color: "white", margin: "0 0 12px" }}>
          Ready to Shop?
        </h2>
        <p style={{ fontSize: "15px", color: "#a5b4fc", margin: "0 0 28px" }}>
          Browse our wide collection of products
        </p>
        <NavLink to="/products" style={{
          background: "#facc15", color: "#1e1b4b", fontWeight: "700",
          padding: "14px 36px", borderRadius: "12px", fontSize: "16px",
          textDecoration: "none", display: "inline-block"
        }}>
          Browse Products →
        </NavLink>
      </div>

    </div>
  );
}