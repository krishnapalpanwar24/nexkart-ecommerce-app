import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();
  const nav = useNavigate();

 
  if (wishlistItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <FaHeart size={64} color="#cbd5e1" style={{ marginBottom: "16px" }} />
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Your Wishlist is Empty!
        </h2>
        <p style={{ fontSize: "15px", color: "#94a3b8", marginBottom: "24px" }}>
          You haven't added any products to your wishlist yet
        </p>
        <button
          onClick={() => nav("/products")}
          style={{ background: "#4f46e5", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "12px 32px", borderRadius: "12px", border: "none", cursor: "pointer" }}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

      
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
            My Wishlist
          </h1>
          <p style={{ fontSize: "15px", color: "#64748b" }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

      
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
             
              <div
                onClick={() => nav(`/product/${item.id}`)}
                style={{ cursor: "pointer", overflow: "hidden", height: "200px" }}
              >
                <img
                  src={item.image || "https://via.placeholder.com/300x200"}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                />
              </div>

             
              <div style={{ padding: "16px" }}>

              
                <span style={{ background: "#eef2ff", color: "#4f46e5", fontSize: "12px", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" }}>
                  {item.category}
                </span>

                <h3
                  onClick={() => nav(`/product/${item.id}`)}
                  style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "10px 0 4px", cursor: "pointer" }}
                >
                  {item.name}
                </h3>

               
                <p style={{ fontSize: "18px", fontWeight: "800", color: "#4f46e5", margin: "4px 0 16px" }}>
                  ₹{item.price}
                </p>

               
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => moveToCart(item)}
                    style={{ flex: 1, background: "#4f46e5", color: "#fff", fontSize: "13px", fontWeight: "700", padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <FaShoppingCart size={13} />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}