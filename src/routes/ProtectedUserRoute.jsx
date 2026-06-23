import { Navigate } from "react-router-dom";

// if user not login than send to
// login page
export default function ProtectedUserRoute({ children }) {
  const isLogged = localStorage.getItem("userLoggedIn");
  return isLogged ? children : <Navigate to="/login" />;
}