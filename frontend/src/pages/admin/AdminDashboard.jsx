import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tally, setTally] = useState(null);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tallyRes, ordersRes] = await Promise.all([
          API.get("/finance/tally"),
          API.get("/orders/all"),
        ]);
        setTally(tallyRes.data);
        setOrderCount(ordersRes.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: "Artist List", desc: "Add and manage artists", path: "/admin/artists", bg: "#C45E0A" },
    { title: "Delivery Partner List", desc: "Add and manage partners", path: "/admin/delivery-partners", bg: "#7B1818" },
    { title: "Paintings Sell", desc: "Upload paintings to store", path: "/admin/paintings", bg: "#F4A030" },
    { title: "Work Distributor", desc: "Assign work to artists", path: "/admin/work-distributor", bg: "#7B1818" },
    { title: "Finance Tally", desc: "View all financial records", path: "/admin/finance", bg: "#C45E0A" },
    { title: "Work Done", desc: "Review artist submissions", path: "/admin/work-distributor", bg: "#F4A030" },
    { title: "Assign Delivery", desc: "Assign orders to delivery partners", path: "/admin/assign-delivery", bg: "#C45E0A" },
    { title: "Paintings Sold", desc: "View all delivered orders", path: "/admin/paintings-sold", bg: "#7B1818" },
  ];

  const stats = [
    { label: "TOTAL COLLECTED", value: tally ? "₹" + tally.totalCollected : "..." },
    { label: "ORDERS THIS MONTH", value: orderCount || "..." },
    { label: "ADMIN PROFIT", value: tally ? "₹" + tally.totalAdminProfit : "..." },
    { label: "COD PENDING", value: tally ? "₹" + tally.totalCODPending : "..." },
  ];

  return (
    <div style={{ backgroundColor: "#120800", minHeight: "100vh", padding: "40px 32px" }}>

      {/* Header */}
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px", color: "#F4A030", marginBottom: "6px" }}>
        Admin Dashboard
      </h1>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#5A3A20", marginBottom: "32px" }}>
        Welcome Admin — ChitraSangam Arts
      </p>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{ backgroundColor: "#1E0C04", border: "1px solid #3A2010", borderRadius: "10px", padding: "20px" }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#F4A030", marginBottom: "6px" }}>
              {stat.value}
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#5A3A20" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* 6 Dashboard Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            style={{ backgroundColor: card.bg, borderRadius: "12px", padding: "36px 28px", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#fff", marginBottom: "8px" }}>
              {card.title}
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#fff", opacity: 0.85 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}