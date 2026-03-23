import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function AssignDelivery() {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [pending, assigned, partners] = await Promise.all([
        API.get("/assign-delivery/pending"),
        API.get("/assign-delivery/assigned"),
        API.get("/assign-delivery/delivery-partners"),
      ]);
      setPendingOrders(pending.data);
      setAssignedOrders(assigned.data);
      setDeliveryPartners(partners.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssignClick = (order) => {
    setSelectedOrder(order);
    setSelectedPartner(null);
    setDeadline("");
    setMessage("");
    setShowModal(true);
  };

  const handleConfirmAssign = async () => {
    if (!selectedPartner) {
      setMessage("Please select a delivery partner!");
      return;
    }
    if (!deadline) {
      setMessage("Please set a delivery deadline!");
      return;
    }
    try {
      await API.post("/assign-delivery/assign", {
        orderId: selectedOrder._id,
        deliveryPartnerId: selectedPartner._id,
        deadline,
      });
      setMessage("");
      setShowModal(false);
      setSelectedOrder(null);
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Assignment failed");
    }
  };

  const tabStyle = (tab) => ({
    fontFamily: "'Cinzel', serif",
    fontSize: "14px",
    padding: "10px 28px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: activeTab === tab ? "#C45E0A" : "transparent",
    color: activeTab === tab ? "#fff" : "#C45E0A",
    border: activeTab === tab ? "none" : "1px solid #C45E0A",
  });

  return (
    <div style={{ backgroundColor: "#120800", minHeight: "100vh", padding: "40px 32px", position: "relative" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px", color: "#F4A030", marginBottom: "4px" }}>
            Assign Delivery
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#5A3A20" }}>
            Assign delivery partners to pending orders
          </p>
        </div>

        {/* Badge */}
        {pendingOrders.length > 0 && (
          <div style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "8px 20px", borderRadius: "20px" }}>
            {pendingOrders.length} Pending
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
        <button style={tabStyle("pending")} onClick={() => setActiveTab("pending")}>
          Pending ({pendingOrders.length})
        </button>
        <button style={tabStyle("assigned")} onClick={() => setActiveTab("assigned")}>
          Assigned ({assignedOrders.length})
        </button>
      </div>

      {/* Pending Orders */}
      {activeTab === "pending" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {pendingOrders.length === 0 ? (
            <p style={{ color: "#F4A030", fontFamily: "'Lato', sans-serif", fontSize: "18px" }}>
              No pending orders!
            </p>
          ) : (
            pendingOrders.map((order) => (
              <div key={order._id} style={{ backgroundColor: "#1E0C04", border: "1px solid #3A2010", borderRadius: "12px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#F4A030", fontWeight: 600 }}>
                      {order.paintingId?.title || "Painting"}
                    </p>
                    <span style={{ backgroundColor: order.paymentMethod === "cod" ? "#C45E0A" : "#1a6b3a", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "11px", padding: "4px 10px", borderRadius: "4px" }}>
                      {order.paymentMethod === "cod" ? "COD" : "Paid Online"}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "4px" }}>
                    Customer: {order.customerId?.fullName} — {order.customerId?.phone}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#A07850", marginBottom: "4px" }}>
                    Address: {order.deliveryAddress}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", fontWeight: "bold", color: "#F4A030" }}>
                    ₹{order.totalAmount}
                  </p>
                </div>
                <button
                  onClick={() => handleAssignClick(order)}
                  style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "14px 28px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Assign
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Assigned Orders */}
      {activeTab === "assigned" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {assignedOrders.length === 0 ? (
            <p style={{ color: "#F4A030", fontFamily: "'Lato', sans-serif", fontSize: "18px" }}>
              No assigned orders yet!
            </p>
          ) : (
            assignedOrders.map((order) => (
              <div key={order._id} style={{ backgroundColor: "#1E0C04", border: "1px solid #3A2010", borderRadius: "12px", padding: "24px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#F4A030", marginBottom: "8px" }}>
                  {order.paintingId?.title || "Painting"}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "4px" }}>
                  Customer: {order.customerId?.fullName} — {order.customerId?.phone}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "4px" }}>
                  Delivery Partner: {order.deliveryPartnerId?.fullName} — {order.deliveryPartnerId?.phone}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#A07850", marginBottom: "4px" }}>
                  Address: {order.deliveryAddress}
                </p>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
                  <span style={{ backgroundColor: "#1a6b3a", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "11px", padding: "4px 10px", borderRadius: "4px" }}>
                    Out for Delivery
                  </span>
                  {order.estimatedDelivery && (
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#A07850" }}>
                      Deadline: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedOrder && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#1E0C04", border: "1px solid #3A2010", borderRadius: "16px", padding: "40px", width: "90%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto" }}>

            {/* Order Summary */}
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "28px", color: "#F4A030", marginBottom: "16px" }}>
              Assign Delivery
            </h2>

            <div style={{ backgroundColor: "#120800", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "6px" }}>
                Painting: {selectedOrder.paintingId?.title}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "6px" }}>
                Customer: {selectedOrder.customerId?.fullName} — {selectedOrder.customerId?.phone}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C8A880", marginBottom: "6px" }}>
                Address: {selectedOrder.deliveryAddress}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "20px", fontWeight: "bold", color: "#F4A030" }}>
                ₹{selectedOrder.totalAmount}
              </p>
            </div>

            {/* Choose Delivery Partner */}
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "#C45E0A", letterSpacing: "0.15em", marginBottom: "16px" }}>
              CHOOSE DELIVERY PARTNER
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "24px" }}>
              {deliveryPartners.map((partner) => (
                <div
                  key={partner._id}
                  onClick={() => setSelectedPartner(partner)}
                  style={{ backgroundColor: "#120800", border: selectedPartner?._id === partner._id ? "2px solid #C45E0A" : "1px solid #3A2010", borderRadius: "8px", padding: "16px", cursor: "pointer" }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F4A030", marginBottom: "4px" }}>
                    {partner.fullName}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#A07850", marginBottom: "4px" }}>
                    Vehicle: {partner.vehicleType}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#C8A880" }}>
                    Active: {partner.activeDeliveries} deliveries
                  </p>
                </div>
              ))}
            </div>

            {/* Deadline */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#C45E0A", letterSpacing: "0.15em", display: "block", marginBottom: "8px" }}>
                DELIVERY DEADLINE
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ width: "100%", backgroundColor: "#120800", border: "1px solid #3A2010", borderRadius: "4px", padding: "12px 16px", color: "#F4A030", fontFamily: "'Lato', sans-serif", fontSize: "16px" }}
              />
            </div>

            {message && (
              <p style={{ color: "#C45E0A", fontFamily: "'Lato', sans-serif", fontSize: "16px", marginBottom: "16px" }}>
                {message}
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleConfirmAssign}
                style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "14px 32px", border: "none", borderRadius: "4px", cursor: "pointer", flex: 1 }}
              >
                Confirm Assign
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: "transparent", color: "#7B1818", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "14px 32px", border: "1px solid #7B1818", borderRadius: "4px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}