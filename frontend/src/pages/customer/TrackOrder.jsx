import { useState, useEffect, useRef } from "react";
import API from "../../api/axios";
import { Html5Qrcode } from "html5-qrcode";

export default function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanningOrderId, setScanningOrderId] = useState(null);
  const [scanMessage, setScanMessage] = useState("");
  const qrRef = useRef(null);
  const html5QrRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const startScanning = (orderId) => {
    setScanningOrderId(orderId);
    setScanning(true);
    setScanMessage("");
  };

  useEffect(() => {
    if (scanning && qrRef.current) {
      html5QrRef.current = new Html5Qrcode("qr-reader");
      html5QrRef.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            // QR scanned successfully
            await html5QrRef.current.stop();
            setScanning(false);

            try {
              await API.put("/delivery/confirm-delivery", {
                qrCode: decodedText,
              });
              setScanMessage("Delivery confirmed successfully!");
              fetchOrders();
            } catch (err) {
              setScanMessage(
                err.response?.data?.message || "Invalid QR code!"
              );
            }
          },
          (err) => {
            // scan error - ignore
          }
        )
        .catch((err) => {
          setScanMessage("Camera access failed. Please allow camera.");
          setScanning(false);
        });
    }

    return () => {
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {});
      }
    };
  }, [scanning]);

  const stopScanning = () => {
    if (html5QrRef.current) {
      html5QrRef.current.stop().catch(() => {});
    }
    setScanning(false);
    setScanningOrderId(null);
  };

  const statusSteps = [
    "placed",
    "assigned_to_artist",
    "painting_completed",
    "out_for_delivery",
    "delivered",
  ];

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "48px 32px" }}>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "48px", color: "#7B1818", marginBottom: "8px" }}>
        Track Orders
      </h1>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#C45E0A", marginBottom: "32px" }}>
        All your orders in one place
      </p>

      {scanMessage && (
        <div style={{ backgroundColor: scanMessage.includes("success") ? "#d4edda" : "#f8d7da", color: scanMessage.includes("success") ? "#155724" : "#721c24", padding: "16px 20px", borderRadius: "8px", marginBottom: "24px", fontSize: "18px", fontFamily: "'Lato', sans-serif", fontWeight: "bold" }}>
          {scanMessage}
        </div>
      )}

      {/* QR Scanner */}
      {scanning && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "#F4A030", marginBottom: "20px", letterSpacing: "0.1em" }}>
            SCAN QR CODE ON DELIVERY PARTNER'S PHONE
          </p>
          <div id="qr-reader" ref={qrRef} style={{ width: "300px", borderRadius: "12px", overflow: "hidden" }} />
          <button
            onClick={stopScanning}
            style={{ marginTop: "24px", backgroundColor: "#7B1818", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "12px 28px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#A07850", fontFamily: "'Lato', sans-serif" }}>
          No orders yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {orders.map((order) => (
            <div key={order._id} style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "8px" }}>
                    {order.paintingId?.title || "Painting"}
                  </h3>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                    Type: {order.orderType}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                    Address: {order.deliveryAddress}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "#5A3A20", marginBottom: "4px" }}>
                    Payment: {order.paymentMethod}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "28px", fontWeight: "bold", color: "#C45E0A" }}>
                    ₹{order.totalAmount}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#A07850" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Status Bar */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px", marginBottom: "20px" }}>
                {statusSteps.map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "11px",
                      backgroundColor: order.orderStatus === step
                        ? "#C45E0A"
                        : statusSteps.indexOf(order.orderStatus) > i
                        ? "#1a6b3a"
                        : "#f0e8e0",
                      color: order.orderStatus === step || statusSteps.indexOf(order.orderStatus) > i
                        ? "#fff"
                        : "#A07850",
                    }}>
                      {step.replace(/_/g, " ")}
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div style={{ width: "16px", height: "1px", backgroundColor: "#E8D5C0", margin: "0 2px" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Delivery Partner Info */}
              {order.deliveryPartnerId && (
                <div style={{ backgroundColor: "#FEF7F0", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", fontWeight: "bold", color: "#5A3A20", marginBottom: "4px" }}>
                    Delivery Partner: {order.deliveryPartnerId.fullName}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#A07850" }}>
                    Contact: {order.deliveryPartnerId.phone}
                  </p>
                </div>
              )}

              {/* Scan to Confirm Delivery Button */}
              {order.orderStatus === "out_for_delivery" && (
                <button
                  onClick={() => startScanning(order._id)}
                  style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "16px", padding: "14px 32px", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  Scan to Confirm Delivery
                </button>
              )}

              {order.orderStatus === "delivered" && (
                <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "12px 20px", borderRadius: "4px", fontFamily: "'Lato', sans-serif", fontSize: "16px", fontWeight: "bold", display: "inline-block" }}>
                  Delivered Successfully
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}