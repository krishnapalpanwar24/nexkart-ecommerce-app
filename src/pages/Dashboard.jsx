import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaBox, FaShoppingBag, FaUsers, FaArrowRight } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsSnap, ordersSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "users")),
        ]);
        setStats({
          products: productsSnap.size,
          orders: ordersSnap.size,
          users: usersSnap.size,
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const isHome = location.pathname === "/dashboard";

  
  const statCards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: <FaBox size={22} color="#4f46e5" />,
      iconBg: "#eef2ff",
      borderColor: "#4f46e5",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: <FaShoppingBag size={22} color="#16a34a" />,
      iconBg: "#f0fdf4",
      borderColor: "#16a34a",
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: <FaUsers size={22} color="#f97316" />,
      iconBg: "#fff7ed",
      borderColor: "#f97316",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6", overflow: "hidden" }}>

      <AdminSidebar />

      <div style={{ flex: 1, overflow: "auto", height: "100vh", padding: "40px 48px" }}>

        {!isHome && <Outlet />}

        {isHome && (
          <div style={{ maxWidth: "900px" }}>

           
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: "0 0 8px" }}>
                Welcome, Admin! 
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Here's what's happening with your store today.
              </p>
            </div>

          
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "36px"
            }}>
              {loading
                ? [1, 2, 3].map((i) => (
                    <div key={i} style={{
                      background: "white", borderRadius: "12px",
                      height: "100px", border: "1px solid #e5e7eb"
                    }} />
                  ))
                : statCards.map((card) => (
                    <div key={card.label} style={{
                      background: "white",
                      borderRadius: "0 12px 12px 0",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      border: "0.5px solid #e5e7eb",
                      borderLeft: `4px solid ${card.borderColor}`,
                    }}>
                      <div style={{
                        background: card.iconBg,
                        padding: "14px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {card.icon}
                      </div>
                      <div>
                        <p style={{
                          fontSize: "11px", fontWeight: "600",
                          color: "#9ca3af", textTransform: "uppercase",
                          letterSpacing: "0.5px", margin: "0 0 4px"
                        }}>
                          {card.label}
                        </p>
                        <p style={{
                          fontSize: "30px", fontWeight: "700",
                          color: "#1f2937", margin: 0, lineHeight: 1
                        }}>
                          {card.value}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>

           
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#374151", margin: "0 0 16px" }}>
              Quick Actions
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

              
              <div
                onClick={() => navigate("/dashboard/add-product")}
                style={{
                  background: "#4f46e5",
                  borderRadius: "16px",
                  padding: "28px",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  background: "rgba(255,255,255,0.2)",
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px",
                }}>
                  <FaBox size={20} color="white" />
                </div>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "white", margin: "0 0 6px" }}>
                  Add New Product
                </p>
                <p style={{ fontSize: "13px", color: "#c7d2fe", margin: "0 0 16px" }}>
                  Add a new product to your store inventory
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#c7d2fe", fontSize: "13px" }}>
                  Get started <FaArrowRight size={11} />
                </div>
              </div>

             
              <div
                onClick={() => navigate("/dashboard/all-products")}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "28px",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  background: "#eef2ff",
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px",
                }}>
                  <FaShoppingBag size={20} color="#4f46e5" />
                </div>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", margin: "0 0 6px" }}>
                  Manage Products
                </p>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 16px" }}>
                  View, edit or delete products from your store
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4f46e5", fontSize: "13px", fontWeight: "600" }}>
                  View all <FaArrowRight size={11} />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}