import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdDashboard, MdAddBox, MdInventory, MdShoppingBag } from "react-icons/md";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <MdDashboard size={20} />, end: true },
    { to: "/dashboard/add-product", label: "Add Product", icon: <MdAddBox size={20} /> },
    { to: "/dashboard/all-products", label: "All Products", icon: <MdInventory size={20} /> },
    { to: "/dashboard/orders", label: "Orders", icon: <MdShoppingBag size={20} /> },
  ];

  return (
    <>

      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 style={{ color: "#4f46e5", fontWeight: "800", fontSize: "18px" }}>
          Nexkart Admin
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-2">
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <FaSignOutAlt size={16} /> Logout
          </button>
        </div>
      )}


      <div
        className="hidden md:flex flex-col p-5 md:w-60"
        style={{
          background: "#1e1b4b",
          minHeight: "100vh",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >

        <div style={{ margin: "25px", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "#fff", fontWeight: "800", fontSize: "30px" }}>
            Nexkart
          </h2>
          <p style={{ color: "#a5b4fc", fontSize: "18px", marginTop: "2px" }}>
            Admin Panel
          </p>
        </div>


        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s",
                background: isActive ? "#4f46e5" : "transparent",
                color: isActive ? "#fff" : "#a5b4fc",
              })}
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>


        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#fca5a5",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            marginTop: "auto",
          }}
        >
          <FaSignOutAlt size={16} /> Logout
        </button>
      </div>
    </>
  );
}