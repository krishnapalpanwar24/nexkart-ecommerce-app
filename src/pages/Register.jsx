import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please fill all fields");
    if (password.length < 6) return alert("Password min 6 characters");

    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const users = snapshot.docs.map((d) => d.data());
      if (users.find((u) => u.email === email)) {
        alert("Email already registered");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "users"), { name, email, password });

      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("adminAuth");

      alert("Registered successfully!");
      nav("/login");
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
            Create Account
          </h2>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            Join Nexkart today!
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        
          <div>
            <label style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block", marginBottom: "8px" }}>
              Full Name
            </label>
            <input
              style={{ width: "100%", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "16px", fontSize: "16px", color: "#0f172a", background: "#ffffff", outline: "none" }}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

        
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
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <button
            disabled={loading}
            style={{ background: "#4f46e5", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer", marginTop: "8px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

      
        <p style={{ textAlign: "center", color: "#475569", fontSize: "15px", marginTop: "24px" }}>
          Already have account?{" "}
          <NavLink to="/login" style={{ color: "#4f46e5", fontWeight: "700" }}>
            Login
          </NavLink>
        </p>

      </div>
    </div>
  );
}