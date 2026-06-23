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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">

     
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        
        <NavLink to="/" className="text-2xl font-extrabold text-indigo-600 no-underline">
          Nexkart
        </NavLink>

       
        <div className="hidden md:flex items-center gap-7">

          <NavLink to="/" className={({ isActive }) =>
            `text-[15px] font-medium no-underline pb-1 transition-all ${isActive
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 border-b-2 border-transparent hover:text-indigo-600"
            }`
          }>
            Home
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            `text-[15px] font-medium no-underline pb-1 transition-all ${isActive
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 border-b-2 border-transparent hover:text-indigo-600"
            }`
          }>
            Products
          </NavLink>

          {user && (
            <>
             
              <NavLink to="/wishlist" className="relative text-gray-500 hover:text-red-500 transition-colors no-underline">
                <FaHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4.25 h-4.25 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </NavLink>

             
              <NavLink to="/cart" className="relative text-gray-500 hover:text-indigo-600 transition-colors no-underline">
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4.25 h-4.25 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>

             
              <span className="text-[14px] font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
              </span>

            
              <button onClick={logout}
                className="text-[14px] font-semibold text-red-500 bg-red-50 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-100 transition cursor-pointer">
                Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink to="/login"
              className="text-[14px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl no-underline transition">
              Login
            </NavLink>
          )}
        </div>

       
        <div className="flex md:hidden items-center gap-4">
          {user && (
            <NavLink to="/cart" className="relative text-gray-500 no-underline">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4.25 h-4.25 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 bg-transparent border-none cursor-pointer p-1"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

      </div>

     
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4 pt-2 border-t border-gray-100 bg-white">

          <NavLink to="/" className={({ isActive }) =>
            `text-[15px] font-medium px-3 py-2.5 rounded-xl no-underline transition ${isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:bg-gray-50"}`
          }>
            🏠 Home
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            `text-[15px] font-medium px-3 py-2.5 rounded-xl no-underline transition ${isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:bg-gray-50"}`
          }>
            🛍️ Products
          </NavLink>

          {user && (
            <>
              <NavLink to="/wishlist" className={({ isActive }) =>
                `text-[15px] font-medium px-3 py-2.5 rounded-xl no-underline transition ${isActive ? "text-red-500 bg-red-50" : "text-gray-600 hover:bg-gray-50"}`
              }>
                ❤️ Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </NavLink>

              <NavLink to="/cart" className={({ isActive }) =>
                `text-[15px] font-medium px-3 py-2.5 rounded-xl no-underline transition ${isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:bg-gray-50"}`
              }>
                🛒 Cart {cartCount > 0 && `(${cartCount})`}
              </NavLink>

              <div className="text-[14px] text-gray-500 px-3 py-2.5 bg-gray-50 rounded-xl">
                👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
              </div>

              <button onClick={logout}
                className="text-[14px] font-semibold text-red-500 bg-red-50 border border-red-200 px-3 py-2.5 rounded-xl text-left hover:bg-red-100 transition cursor-pointer">
                🚪 Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink to="/login"
              className="text-[15px] font-semibold text-white bg-indigo-600 px-3 py-2.5 rounded-xl text-center no-underline hover:bg-indigo-700 transition">
              🔐 Login
            </NavLink>
          )}
        </div>
      )}

    </nav>
  );
}