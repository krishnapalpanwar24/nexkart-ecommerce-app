import { Navigate } from "react-router-dom";

// if admin not login than send 
// admin to login pages
export default function ProtectedAdminRoute({ children }) {
  const adminAuth = localStorage.getItem("adminAuth");
  return adminAuth ? children : <Navigate to="/admin-login" />;
}