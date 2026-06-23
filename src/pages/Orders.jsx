import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";
import { FaShoppingBag } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snap = await getDocs(collection(db, "orders"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

 
  const updateStatus = async (orderId, status) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, status } : o
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Delivered") return { bg: "#f0fdf4", color: "#22c55e", border: "#86efac" };
    if (status === "Processing") return { bg: "#eff6ff", color: "#3b82f6", border: "#93c5fd" };
    if (status === "Cancelled") return { bg: "#fef2f2", color: "#ef4444", border: "#fca5a5" };
    return { bg: "#fff7ed", color: "#f97316", border: "#fdba74" };
  };

  if (loading) return <Loader />;

  return (
    <div style={{ width: "100%", paddingRight: "24px", paddingBottom: "40px" }}>

     
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>
          Orders
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
          {orders.length} total orders
        </p>
      </div>

    
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
          <FaShoppingBag size={48} color="#cbd5e1" style={{ marginBottom: "12px" }} />
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>No orders yet!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order, i) => (
            <div
              key={order.id}
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                    Order #{i + 1}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>

               
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
                    {order.user?.name || "Unknown"}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {order.user?.email || ""}
                  </p>
                </div>

                
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "18px", fontWeight: "800", color: "#4f46e5" }}>
                    ₹{order.total}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {order.items?.length} items
                  </p>
                </div>

               
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: `1.5px solid ${getStatusColor(order.status).border}`,
                    background: getStatusColor(order.status).bg,
                    color: getStatusColor(order.status).color,
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {order.items?.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={item.image || "https://via.placeholder.com/40"}
                      alt={item.name}
                      style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}