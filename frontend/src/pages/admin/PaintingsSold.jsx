import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function PaintingsSold() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/all");
        const delivered = res.data.filter((o) => o.orderStatus === "delivered");
        setOrders(delivered);
        setFiltered(delivered);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(orders);
      return;
    }
    const lower = search.toLowerCase();
    const result = orders.filter((o) =>
      o.paintingId?.title?.toLowerCase().includes(lower) ||
      o.customerId?.fullName?.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [search, orders]);

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "40px 32px" }}>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "48px", color: "#7B1818", marginBottom: "8px" }}>
        Paintings Sold
      </h1>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#C45E0A", marginBottom: "32px" }}>
        Complete log of all delivered orders
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by painting or customer name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: "500px", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "14px 20px", fontSize: "18px", fontFamily: "'Lato', sans-serif", backgroundColor: "#fff", marginBottom: "32px" }}
      />

      {filtered.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#A07850", fontFamily: "'Lato', sans-serif" }}>
          No delivered orders yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filtered.map((order) => (
            <div key={order._id} style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "#7B1818", marginBottom: "8px" }}>
                  {order.paintingId?.title || "Painting"}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                  Customer: {order.customerId?.fullName} — {order.customerId?.phone}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                  Address: {order.deliveryAddress}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                  Payment: {order.paymentMethod}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
                  Delivery Partner: {order.deliveryPartnerId?.fullName || "N/A"}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#A07850" }}>
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "28px", fontWeight: "bold", color: "#C45E0A", marginBottom: "8px" }}>
                  ₹{order.totalAmount}
                </p>
                <span style={{ backgroundColor: "#d4edda", color: "#155724", fontFamily: "'Cinzel', serif", fontSize: "12px", padding: "6px 14px", borderRadius: "4px" }}>
                  Delivered
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {filtered.length > 0 && (
        <div style={{ marginTop: "40px", backgroundColor: "#FEF7F0", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "16px" }}>
            Summary
          </h2>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "20px", color: "#5A3A20", marginBottom: "8px" }}>
            Total Orders Delivered: <strong style={{ color: "#C45E0A" }}>{filtered.length}</strong>
          </p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "20px", color: "#5A3A20" }}>
            Total Revenue: <strong style={{ color: "#C45E0A" }}>₹{filtered.reduce((sum, o) => sum + o.totalAmount, 0)}</strong>
          </p>
        </div>
      )}

    </div>
  );
}