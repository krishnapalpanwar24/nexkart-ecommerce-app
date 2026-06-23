import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        user: user,
        items: cartItems,
        total: cartTotal,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      clearCart();
      alert("Order placed successfully! 🎉");
      nav("/products");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <FaShoppingCart size={64} color="#cbd5e1" style={{ marginBottom: "16px" }} />
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Your Cart is Empty!
        </h2>
        <p style={{ fontSize: "15px", color: "#94a3b8", marginBottom: "24px" }}>
          You haven't added any products yet
        </p>
        <button
          onClick={() => nav("/products")}
          style={{ background: "#4f46e5", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "12px 32px", borderRadius: "12px", border: "none", cursor: "pointer" }}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
            Your Cart
          </h1>
          <p style={{ fontSize: "15px", color: "#64748b" }}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>

          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />

               
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: "800", color: "#4f46e5", marginBottom: "4px" }}>
                    ₹{item.price}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {item.category}
                  </p>
                </div>

               
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: "8px 14px", background: "#f8fafc", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "700", color: "#374151" }}
                  >
                    −
                  </button>
                  <span style={{ padding: "8px 14px", fontSize: "14px", fontWeight: "700", color: "#0f172a", borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: "8px 14px", background: "#f8fafc", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "700", color: "#374151" }}
                  >
                    +
                  </button>
                </div>

                
                <p style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", width: "70px", textAlign: "right" }}>
                  ₹{item.price * item.quantity}
                </p>

                
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: "#fef2f2", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", color: "#ef4444" }}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>

          
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", position: "sticky", top: "80px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#64748b" }}>Subtotal</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>₹{cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#64748b" }}>Delivery</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: cartTotal >= 500 ? "#22c55e" : "#0f172a" }}>
                  {cartTotal >= 500 ? "FREE" : "₹50"}
                </span>
              </div>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>Total</span>
                <span style={{ fontSize: "18px", fontWeight: "800", color: "#4f46e5" }}>
                  ₹{cartTotal >= 500 ? cartTotal : cartTotal + 50}
                </span>
              </div>
            </div>

            {cartTotal < 500 && (
              <p style={{ fontSize: "12px", color: "#f97316", marginBottom: "16px", background: "#fff7ed", padding: "8px 12px", borderRadius: "8px" }}>
                Add ₹{500 - cartTotal} more for free delivery!
              </p>
            )}

            <button
              onClick={placeOrder}
              disabled={loading}
              style={{ width: "100%", background: loading ? "#818cf8" : "#4f46e5", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "14px", borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer", marginBottom: "10px" }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <button
              onClick={() => nav("/products")}
              style={{ width: "100%", background: "#fff", color: "#64748b", fontSize: "14px", fontWeight: "600", padding: "12px", borderRadius: "12px", border: "1.5px solid #e2e8f0", cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}