import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";


import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AllProducts from "./pages/AllProducts";
import Error from "./pages/Error";
import Orders from "./pages/Orders";


import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

export default function App() {
  const location = useLocation();

  
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/admin-login";

  return (
   
    <CartProvider>
      <div className="min-h-screen bg-gray-50">

     
        {!hideNavbar && <Navbar />}

        <Routes>

        
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        
          <Route path="/cart" element={
            <ProtectedUserRoute>
              <Cart />
            </ProtectedUserRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedUserRoute>
              <Wishlist />
            </ProtectedUserRoute>
          } />

         
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>

      
          <Route path="*" element={<Error />} />

        </Routes>
      </div>
    </CartProvider>
  );
}