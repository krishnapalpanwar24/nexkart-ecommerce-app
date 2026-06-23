import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  const { addToCart, addToWishlist, wishlistItems } = useCart();

 
  const user = localStorage.getItem("userLoggedIn");

  
  const isWishlisted = wishlistItems.find(item => item.id === product.id);

 
  const addToCartHandler = () => {
    if (!user) {
      alert("Please login to add items to cart!");
      nav("/login");
      return;
    }
    addToCart(product);
  };


  const addToWishlistHandler = () => {
    if (!user) {
      alert("Please login to add items to wishlist!");
      nav("/login");
      return;
    }
    addToWishlist(product);
  };

 return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>

    
      <div onClick={() => nav(`/product/${product.id}`)} style={{ cursor: "pointer", overflow: "hidden", height: "200px" }}>
        <img
          src={product.image || "https://via.placeholder.com/300x200"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
        />
      </div>

      
      <div style={{ padding: "16px" }}>

       
        <span style={{ background: "#eef2ff", color: "#4f46e5", fontSize: "12px", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" }}>
          {product.category}
        </span>

        
        <h3
          onClick={() => nav(`/product/${product.id}`)}
          style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "10px 0 4px", cursor: "pointer" }}
        >
          {product.name}
        </h3>

        <p style={{ fontSize: "18px", fontWeight: "800", color: "#4f46e5", margin: "4px 0 8px" }}>
          ₹{product.price}
        </p>

       
        <p style={{ fontSize: "12px", fontWeight: "600", color: product.stock > 0 ? "#22c55e" : "#ef4444", marginBottom: "14px" }}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>

        
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={addToCartHandler}
            disabled={product.stock === 0}
            style={{ flex: 1, background: product.stock === 0 ? "#e2e8f0" : "#4f46e5", color: product.stock === 0 ? "#94a3b8" : "#fff", fontSize: "13px", fontWeight: "700", padding: "10px", borderRadius: "10px", border: "none", cursor: product.stock === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          >
            <FaShoppingCart size={13} />
            {user ? "Add to Cart" : "Login to Buy"}
          </button>

          <button
            onClick={addToWishlistHandler}
            style={{ padding: "10px 12px", borderRadius: "10px", border: `1px solid ${isWishlisted ? "#fecaca" : "#e2e8f0"}`, background: isWishlisted ? "#fef2f2" : "#fff", color: isWishlisted ? "#ef4444" : "#94a3b8", cursor: "pointer" }}
          >
            <FaHeart size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}