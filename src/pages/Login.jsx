import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");

    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      const users = snap.docs.map((d) => d.data());
      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (found) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify({
          name: found.name,
          email: found.email
        }));
        nav("/products");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        style={{ padding: "35px" }}
        className="bg-gray-100 border border-gray-300 rounded-2xl w-full max-w-md shadow-sm"
      >

        
        <div className="text-center" style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Welcome Back!
          </h2>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            Login to your Nexkart account
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

         
          <div>
            <label style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block", marginBottom: "8px" }}>
              Email
            </label>
            <input
              type="email"
              style={{ width: "100%", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "16px", fontSize: "16px", color: "#0f172a", background: "#ffffff", outline: "none" }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         
          <div>
            <label style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              style={{ width: "100%", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "16px", fontSize: "16px", color: "#0f172a", background: "#ffffff", outline: "none" }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        
          <button
            disabled={loading}
            style={{ background: "#4f46e5", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer", marginTop: "8px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

       
        <p style={{ textAlign: "center", color: "#475569", fontSize: "15px", marginTop: "24px" }}>
          New user?{" "}
          <NavLink to="/register" style={{ color: "#4f46e5", fontWeight: "700" }}>
            Register
          </NavLink>
        </p>

       
        <div style={{ borderTop: "1px solid #cbd5e1", marginTop: "24px", paddingTop: "16px", textAlign: "center" }}>
          <NavLink to="/admin-login" style={{ color: "#64748b", fontSize: "13px" }}>
            Admin Login →
          </NavLink>
        </div>

      </div>
    </div>
  );
}