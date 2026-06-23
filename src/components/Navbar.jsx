import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("userLoggedIn"));
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlistItems } = useCart();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(localStorage.getItem("userLoggedIn"));
    setMenuOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setMenuOpen(false);
    nav("/login");
  };

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50, width: "100%" }}>

      
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        
        <NavLink to="/" style={{ fontSize: "22px", fontWeight: "800", color: "#4f46e5", textDecoration: "none" }}>
          Nexkart
        </NavLink>

       
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>

          <NavLink to="/"
            style={({ isActive }) => ({
              fontSize: "15px",
              fontWeight: "500",
              color: isActive ? "#4f46e5" : "#6b7280",
              textDecoration: "none",
              paddingBottom: "2px",
              borderBottom: isActive ? "2px solid #4f46e5" : "2px solid transparent",
            })}
          >
            Home
          </NavLink>

          <NavLink to="/products"
            style={({ isActive }) => ({
              fontSize: "15px",
              fontWeight: "500",
              color: isActive ? "#4f46e5" : "#6b7280",
              textDecoration: "none",
              paddingBottom: "2px",
              borderBottom: isActive ? "2px solid #4f46e5" : "2px solid transparent",
            })}
          >
            Products
          </NavLink>

          {user && (
            <>
              
              <NavLink to="/wishlist" style={{ position: "relative", color: "#6b7280", textDecoration: "none" }}>
                <FaHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", fontSize: "10px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                    {wishlistItems.length}
                  </span>
                )}
              </NavLink>

             
              <NavLink to="/cart" style={{ position: "relative", color: "#6b7280", textDecoration: "none" }}>
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#4f46e5", color: "#fff", fontSize: "10px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                    {cartCount}
                  </span>
                )}
              </NavLink>

             
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151", background: "#f3f4f6", padding: "6px 12px", borderRadius: "8px" }}>
                👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
              </span>

             
              <button
                onClick={logout}
                style={{ fontSize: "14px", fontWeight: "600", color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "8px 16px", borderRadius: "10px", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink
              to="/login"
              style={{ fontSize: "14px", fontWeight: "600", color: "#fff", background: "#4f46e5", padding: "8px 20px", borderRadius: "10px", textDecoration: "none" }}
            >
              Login
            </NavLink>
          )}
        </div>

      </div>

      
      {menuOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "12px 16px 16px", borderTop: "1px solid #f1f5f9", background: "#fff" }}>

          <NavLink to="/"
            style={({ isActive }) => ({
              fontSize: "15px", fontWeight: "500", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", color: isActive ? "#4f46e5" : "#374151", background: isActive ? "#eef2ff" : "transparent"
            })}
          >
            🏠 Home
          </NavLink>

          <NavLink to="/products"
            style={({ isActive }) => ({
              fontSize: "15px", fontWeight: "500", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", color: isActive ? "#4f46e5" : "#374151", background: isActive ? "#eef2ff" : "transparent"
            })}
          >
            🛍️ Products
          </NavLink>

          {user && (
            <>
              <NavLink to="/wishlist"
                style={({ isActive }) => ({
                  fontSize: "15px", fontWeight: "500", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", color: isActive ? "#ef4444" : "#374151", background: isActive ? "#fef2f2" : "transparent"
                })}
              >
                ❤️ Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </NavLink>

              <NavLink to="/cart"
                style={({ isActive }) => ({
                  fontSize: "15px", fontWeight: "500", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", color: isActive ? "#4f46e5" : "#374151", background: isActive ? "#eef2ff" : "transparent"
                })}
              >
                🛒 Cart {cartCount > 0 && `(${cartCount})`}
              </NavLink>

              <div style={{ fontSize: "14px", color: "#6b7280", padding: "10px 12px", background: "#f9fafb", borderRadius: "10px" }}>
                👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
              </div>

              <button
                onClick={logout}
                style={{ fontSize: "14px", fontWeight: "600", color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", textAlign: "left" }}
              >
                🚪 Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink
              to="/login"
              style={{ fontSize: "15px", fontWeight: "600", color: "#fff", background: "#4f46e5", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", textAlign: "center" }}
            >
              🔐 Login
            </NavLink>
          )}
        </div>
      )}

    </nav>
  );
}