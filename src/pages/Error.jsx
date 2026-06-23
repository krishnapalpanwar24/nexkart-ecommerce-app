import { NavLink } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <FaExclamationTriangle size={60} className="text-indigo-600 mb-4" />
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 text-lg mb-6">Page not found</p>
      <NavLink
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
      >
        Go Home
      </NavLink>
    </div>
  );
}