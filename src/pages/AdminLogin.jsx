import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

const ADMIN_EMAIL = "admin@nexkart.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");

    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        nav("/dashboard");
      } else {
        alert("Invalid admin credentials");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        style={{ padding: "25px" }}
        className="bg-gray-100 border border-gray-300 rounded-2xl w-full max-w-md shadow-sm"
      >

       
        <div className="text-center" style={{ marginBottom: "12px" }}>
          <div className="flex justify-center mb-3">
            <div className="bg-indigo-100 p-4 rounded-2xl">
              <MdAdminPanelSettings size={40} className="text-indigo-600" />
            </div>
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Admin Login
          </h2>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            Nexkart Admin Panel
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

         
          <div>
            <label style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block", marginBottom: "8px" }}>
              Admin Email
            </label>
            <input
              type="email"
              style={{ width: "100%", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "16px", fontSize: "16px", color: "#0f172a", background: "#ffffff", outline: "none" }}
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         
          <div>
            <label style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block", marginBottom: "8px" }}>
              Admin Password
            </label>
            <input
              type="password"
              style={{ width: "100%", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "16px", fontSize: "16px", color: "#0f172a", background: "#ffffff", outline: "none" }}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <button
            disabled={loading}
            style={{ background: "#4f46e5", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer", marginTop: "8px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>

        
        <p style={{ textAlign: "center", color: "#475569", fontSize: "15px", marginTop: "24px" }}>
          User?{" "}
          <span
            onClick={() => nav("/login")}
            style={{ color: "#4f46e5", fontWeight: "700", cursor: "pointer" }}
          >
            Go to Login
          </span>
        </p>

      </div>
    </div>
  );
}