import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function DeliveryDashboard() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await API.get("/delivery/my-deliveries");
        setDeliveries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDeliveries();
  }, []);

  const todayDeliveries = deliveries.filter((d) => d.orderStatus === "out_for_delivery");
  const totalEarnings = deliveries.length * 30;
  const codPending = deliveries.filter((d) => d.paymentMethod === "cod" && d.codStatus === "collected" && !d.codReceivedByAdmin)
    .reduce((sum, d) => sum + d.totalAmount, 0);

  const handleCODCollected = async (orderId) => {
    try {
      await API.put("/orders/cod-collected/" + orderId);
      setMessage("Cash collected recorded!");
      const res = await API.get("/delivery/my-deliveries");
      setDeliveries(res.data);
    } catch (err) {
      setMessage("Failed to record");
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "48px 32px" }}>

      {/* Header */}
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "42px", color: "#7B1818", marginBottom: "32px" }}>
        Welcome, Delivery Partner
      </h1>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#FEF7F0", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", color: "#C45E0A", marginBottom: "8px" }}>
            {todayDeliveries.length}
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#A07850", letterSpacing: "0.15em" }}>
            TODAY'S DELIVERIES
          </p>
        </div>
        <div style={{ backgroundColor: "#FEF7F0", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", color: "#C45E0A", marginBottom: "8px" }}>
            ₹{totalEarnings}
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#A07850", letterSpacing: "0.15em" }}>
            TOTAL EARNINGS
          </p>
        </div>
        <div style={{ backgroundColor: "#FEF7F0", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", color: "#7B1818", marginBottom: "8px" }}>
            ₹{codPending}
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#A07850", letterSpacing: "0.15em" }}>
            COD PENDING
          </p>
        </div>
      </div>

      {/* COD Alert Box */}
      {codPending > 0 && (
        <div style={{ backgroundColor: "#FEF7F0", border: "1px solid #F0D0A0", borderRadius: "10px", padding: "24px 28px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#C45E0A", marginBottom: "6px" }}>
              COD PENDING — SUBMIT TO ADMIN
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "4px" }}>
              ₹{codPending}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#A07850" }}>
              Submit to admin today
            </p>
          </div>
          <button style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "14px 28px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Mark Submitted
          </button>
        </div>
      )}

      {message && (
        <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "16px" }}>
          {message}
        </div>
      )}

      {/* Today's Deliveries */}
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#C45E0A", letterSpacing: "0.2em", marginBottom: "20px" }}>
        TODAY'S DELIVERIES
      </p>

      {deliveries.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#A07850", fontFamily: "'Lato', sans-serif" }}>
          No deliveries assigned yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {deliveries.map((order) => (
            <div key={order._id} style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#7B1818", fontWeight: 600, marginBottom: "4px" }}>
                    {order.paintingId?.title || "Painting"}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                    Customer: {order.customerId?.fullName} — {order.customerId?.phone}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                    Address: {order.deliveryAddress}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "20px", fontWeight: "bold", color: "#C45E0A" }}>
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                  <span style={{ backgroundColor: order.orderStatus === "delivered" ? "#d4edda" : "#FEF7F0", color: order.orderStatus === "delivered" ? "#155724" : "#C45E0A", fontFamily: "'Cinzel', serif", fontSize: "12px", padding: "6px 14px", borderRadius: "4px" }}>
                    {order.paymentMethod === "cod" ? "COD — ₹" + order.totalAmount : "Out for Delivery"}
                  </span>

                  {order.paymentMethod === "cod" && order.codStatus === "pending" && (
                    <button
                      onClick={() => handleCODCollected(order._id)}
                      style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "13px", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Cash Collected
                    </button>
                  )}

                  {order.codStatus === "collected" && (
                    <span style={{ backgroundColor: "#d4edda", color: "#155724", fontFamily: "'Lato', sans-serif", fontSize: "14px", padding: "6px 14px", borderRadius: "4px" }}>
                      Cash Collected
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/delivery/my-deliveries")}
        style={{ marginTop: "32px", backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "16px", padding: "16px 32px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        View All Deliveries
      </button>

    </div>
  );
}