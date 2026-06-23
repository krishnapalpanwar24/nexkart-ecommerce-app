import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { FaShoppingCart, FaHeart, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart, addToWishlist, wishlistItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlistItems.find((item) => item.id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          nav("/products");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
   
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (!isLoggedIn) {
      nav("/login");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (!isLoggedIn) {
      nav("/login");
      return;
    }
    addToWishlist(product);
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => nav("/products")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            color: "#6b7280", fontSize: "14px", fontWeight: "500",
            marginBottom: "24px", padding: 0,
          }}
        >
          <FaArrowLeft size={13} /> Back to Products
        </button>

       
        <div style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}>

         
          <div style={{
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
            minHeight: "400px",
          }}>
            <img
              src={product.image || "https://via.placeholder.com/400x300"}
              alt={product.name}
              style={{
                maxHeight: "320px",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>

          
          <div style={{ padding: "48px", display: "flex", flexDirection: "column", gap: "20px" }}>

           
            <div>
              <span style={{
                background: "#eef2ff", color: "#4f46e5",
                fontSize: "12px", fontWeight: "600",
                padding: "5px 14px", borderRadius: "20px",
              }}>
                {product.category}
              </span>
            </div>

         
            <div>
              <h1 style={{
                fontSize: "28px", fontWeight: "700",
                color: "#1f2937", margin: "0 0 10px", lineHeight: "1.3"
              }}>
                {product.name}
              </h1>

             
              {product.description && (
                <p style={{
                  fontSize: "14px", color: "#6b7280",
                  lineHeight: "1.7", margin: 0
                }}>
                  {product.description}
                </p>
              )}
            </div>

          
            <div style={{
              background: "#f9fafb", borderRadius: "12px",
              padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 4px" }}>Price</p>
                <p style={{ fontSize: "32px", fontWeight: "800", color: "#4f46e5", margin: 0 }}>
                  ₹{product.price}
                </p>
              </div>
             
              <span style={{
                background: product.stock > 0 ? "#f0fdf4" : "#fef2f2",
                color: product.stock > 0 ? "#16a34a" : "#dc2626",
                fontSize: "12px", fontWeight: "600",
                padding: "6px 14px", borderRadius: "20px",
                border: product.stock > 0 ? "1px solid #bbf7d0" : "1px solid #fecaca",
              }}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </div>

            
            {product.stock > 0 && (
              <div>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: "0 0 10px" }}>
                  Quantity
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "40px", height: "40px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px 0 0 10px",
                      background: "#f9fafb", cursor: "pointer",
                      fontSize: "18px", color: "#374151",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    −
                  </button>
                  <div style={{
                    width: "56px", height: "40px",
                    border: "1px solid #e5e7eb", borderLeft: "none", borderRight: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", fontWeight: "700", color: "#1f2937",
                  }}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    style={{
                      width: "40px", height: "40px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0 10px 10px 0",
                      background: "#f9fafb", cursor: "pointer",
                      fontSize: "18px", color: "#374151",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

           
            {product.stock > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Total Amount</span>
                <span style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937" }}>
                  ₹{product.price * quantity}
                </span>
              </div>
            )}

            
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  fontSize: "15px", fontWeight: "600",
                  background: added ? "#16a34a" : product.stock === 0 ? "#d1d5db" : "#4f46e5",
                  color: "white",
                  transition: "all 0.2s",
                }}
              >
                {added ? (
                  <><FaCheckCircle size={16} /> Added to Cart!</>
                ) : (
                  <><FaShoppingCart size={16} /> Add to Cart</>
                )}
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  width: "52px", height: "52px",
                  borderRadius: "12px",
                  border: isWishlisted ? "2px solid #fca5a5" : "1px solid #e5e7eb",
                  background: isWishlisted ? "#fef2f2" : "white",
                  color: isWishlisted ? "#ef4444" : "#9ca3af",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <FaHeart size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}