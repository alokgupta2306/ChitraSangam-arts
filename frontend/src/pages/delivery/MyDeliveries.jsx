import { useState, useEffect } from "react";
import API from "../../api/axios";
import { QRCodeSVG as QRCode } from "qrcode.react";

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState("");

  const fetchDeliveries = async () => {
    try {
      const res = await API.get("/delivery/my-deliveries");
      setDeliveries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchDeliveries(); }, []);

  const handleCODCollected = async (orderId) => {
    try {
      await API.put(`/orders/cod-collected/${orderId}`);
      setMessage("Cash collected recorded successfully!");
      fetchDeliveries();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "48px 32px" }}>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "48px", color: "#7B1818", marginBottom: "8px" }}>
        My Deliveries
      </h1>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#C45E0A", marginBottom: "32px" }}>
        All assigned deliveries
      </p>

      {message && (
        <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "18px", fontFamily: "'Lato', sans-serif" }}>
          {message}
        </div>
      )}

      {deliveries.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#A07850", fontFamily: "'Lato', sans-serif" }}>
          No deliveries assigned yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {deliveries.map((order) => (
            <div key={order._id} style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "8px" }}>
                {order.paintingId?.title || "Painting"}
              </h3>

              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                Customer: {order.customerId?.fullName}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                Phone: {order.customerId?.phone}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                Address: {order.deliveryAddress}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "22px", fontWeight: "bold", color: "#C45E0A", marginBottom: "4px" }}>
                Amount: ₹{order.totalAmount}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#A07850", marginBottom: "16px" }}>
                Payment: {order.paymentMethod} | Status: {order.orderStatus}
              </p>

              {/* QR Code */}
              {order.qrCode && (
                <div style={{ marginBottom: "16px", padding: "20px", backgroundColor: "#FEF7F0", borderRadius: "8px", display: "inline-block", border: "1px solid #E8D5C0" }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#C45E0A", marginBottom: "12px", letterSpacing: "0.1em" }}>
                    SHOW THIS QR TO CUSTOMER
                  </p>
                  <QRCode value={order.qrCode} size={180} />
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#A07850", marginTop: "10px", textAlign: "center" }}>
                    Customer scans this to confirm delivery
                  </p>
                </div>
              )}

              {/* COD Button */}
              {order.paymentMethod === "cod" && order.codStatus === "pending" && (
                <div style={{ marginTop: "12px" }}>
                  <button
                    onClick={() => handleCODCollected(order._id)}
                    style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "16px", padding: "14px 28px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Cash Collected
                  </button>
                </div>
              )}

              {order.codStatus === "collected" && (
                <div style={{ marginTop: "12px" }}>
                  <span style={{ backgroundColor: "#d4edda", color: "#155724", fontFamily: "'Lato', sans-serif", fontSize: "16px", padding: "10px 20px", borderRadius: "4px", fontWeight: "bold" }}>
                    Cash Collected ✓
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}