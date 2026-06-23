import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("userLoggedIn"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { cartCount, wishlistItems } = useCart();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(localStorage.getItem("userLoggedIn"));
    setMenuOpen(false);
  }, [location]);

  // ✅ Window resize track karo
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setMenuOpen(false);
    nav("/login");
  };

  const userName = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User";

  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      boxSizing: "border-box",
    }}>

      {/* Main Row */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}>

        {/* Logo */}
        <NavLink to="/" style={{
          fontSize: "22px", fontWeight: "800",
          color: "#4f46e5", textDecoration: "none",
        }}>
          Nexkart
        </NavLink>

        {/* ✅ Desktop Links — isMobile false hone pe */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>

            <NavLink to="/" style={({ isActive }) => ({
              fontSize: "15px", fontWeight: "500", textDecoration: "none",
              paddingBottom: "2px", color: isActive ? "#4f46e5" : "#6b7280",
              borderBottom: isActive ? "2px solid #4f46e5" : "2px solid transparent",
            })}>
              Home
            </NavLink>

            <NavLink to="/products" style={({ isActive }) => ({
              fontSize: "15px", fontWeight: "500", textDecoration: "none",
              paddingBottom: "2px", color: isActive ? "#4f46e5" : "#6b7280",
              borderBottom: isActive ? "2px solid #4f46e5" : "2px solid transparent",
            })}>
              Products
            </NavLink>

            {user && (
              <>
                {/* Wishlist */}
                <NavLink to="/wishlist" style={{ position: "relative", color: "#6b7280", textDecoration: "none" }}>
                  <FaHeart size={20} />
                  {wishlistItems.length > 0 && (
                    <span style={{
                      position: "absolute", top: "-8px", right: "-8px",
                      background: "#ef4444", color: "white", fontSize: "10px",
                      width: "17px", height: "17px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700",
                    }}>
                      {wishlistItems.length}
                    </span>
                  )}
                </NavLink>

                {/* Cart */}
                <NavLink to="/cart" style={{ position: "relative", color: "#6b7280", textDecoration: "none" }}>
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span style={{
                      position: "absolute", top: "-8px", right: "-8px",
                      background: "#4f46e5", color: "white", fontSize: "10px",
                      width: "17px", height: "17px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700",
                    }}>
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                {/* User */}
                <span style={{
                  fontSize: "14px", fontWeight: "500", color: "#374151",
                  background: "#f3f4f6", padding: "6px 12px", borderRadius: "8px",
                }}>
                  👤 {userName}
                </span>

                {/* Logout */}
                <button onClick={logout} style={{
                  fontSize: "14px", fontWeight: "600", color: "#ef4444",
                  background: "#fef2f2", border: "1px solid #fecaca",
                  padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                }}>
                  Logout
                </button>
              </>
            )}

            {!user && (
              <NavLink to="/login" style={{
                fontSize: "14px", fontWeight: "600", color: "white",
                background: "#4f46e5", padding: "8px 20px",
                borderRadius: "10px", textDecoration: "none",
              }}>
                Login
              </NavLink>
            )}
          </div>
        )}

        {/* ✅ Mobile — Cart + Hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {user && (
              <NavLink to="/cart" style={{ position: "relative", color: "#6b7280", textDecoration: "none" }}>
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute", top: "-8px", right: "-8px",
                    background: "#4f46e5", color: "white", fontSize: "10px",
                    width: "17px", height: "17px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "700",
                  }}>
                    {cartCount}
                  </span>
                )}
              </NavLink>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none",
                cursor: "pointer", color: "#374151", padding: "4px",
              }}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        )}

      </div>

      {/* ✅ Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          display: "flex", flexDirection: "column", gap: "4px",
          padding: "12px 16px 16px",
          borderTop: "1px solid #f1f5f9",
          background: "white",
        }}>

          <NavLink to="/" style={({ isActive }) => ({
            fontSize: "15px", fontWeight: "500", padding: "10px 12px",
            borderRadius: "10px", textDecoration: "none",
            color: isActive ? "#4f46e5" : "#374151",
            background: isActive ? "#eef2ff" : "transparent",
          })}>
            🏠 Home
          </NavLink>

          <NavLink to="/products" style={({ isActive }) => ({
            fontSize: "15px", fontWeight: "500", padding: "10px 12px",
            borderRadius: "10px", textDecoration: "none",
            color: isActive ? "#4f46e5" : "#374151",
            background: isActive ? "#eef2ff" : "transparent",
          })}>
            🛍️ Products
          </NavLink>

          {user && (
            <>
              <NavLink to="/wishlist" style={({ isActive }) => ({
                fontSize: "15px", fontWeight: "500", padding: "10px 12px",
                borderRadius: "10px", textDecoration: "none",
                color: isActive ? "#ef4444" : "#374151",
                background: isActive ? "#fef2f2" : "transparent",
              })}>
                ❤️ Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </NavLink>

              <NavLink to="/cart" style={({ isActive }) => ({
                fontSize: "15px", fontWeight: "500", padding: "10px 12px",
                borderRadius: "10px", textDecoration: "none",
                color: isActive ? "#4f46e5" : "#374151",
                background: isActive ? "#eef2ff" : "transparent",
              })}>
                🛒 Cart {cartCount > 0 && `(${cartCount})`}
              </NavLink>

              <div style={{
                fontSize: "14px", color: "#6b7280", padding: "10px 12px",
                background: "#f9fafb", borderRadius: "10px",
              }}>
                👤 {userName}
              </div>

              <button onClick={logout} style={{
                fontSize: "14px", fontWeight: "600", color: "#ef4444",
                background: "#fef2f2", border: "1px solid #fecaca",
                padding: "10px 12px", borderRadius: "10px",
                cursor: "pointer", textAlign: "left",
              }}>
                🚪 Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink to="/login" style={{
              fontSize: "15px", fontWeight: "600", color: "white",
              background: "#4f46e5", padding: "10px 12px",
              borderRadius: "10px", textDecoration: "none", textAlign: "center",
            }}>
              🔐 Login
            </NavLink>
          )}
        </div>
      )}

    </nav>
  );
}