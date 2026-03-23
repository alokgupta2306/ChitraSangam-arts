import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function BuyPaintings() {
  const [paintings, setPaintings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [artists, setArtists] = useState([]);
  const [styleFilter, setStyleFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, aRes] = await Promise.all([
        API.get("/paintings"),
        API.get("/admin/artists").catch(() => ({ data: [] })),
      ]);
        setPaintings(pRes.data);
        setFiltered(pRes.data);
        setArtists(aRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = paintings;
    if (styleFilter) {
      result = result.filter((p) => p.style?.toLowerCase().includes(styleFilter.toLowerCase()));
    }
    if (priceFilter === "under1000") {
      result = result.filter((p) => p.buyPrice < 1000);
    } else if (priceFilter === "1000to3000") {
      result = result.filter((p) => p.buyPrice >= 1000 && p.buyPrice <= 3000);
    } else if (priceFilter === "above3000") {
      result = result.filter((p) => p.buyPrice > 3000);
    }
    if (artistFilter) {
      result = result.filter((p) => p.artistId === artistFilter);
    }
    setFiltered(result);
  }, [styleFilter, priceFilter, artistFilter, paintings]);

  const handleBuy = async (painting) => {
    if (!user) { navigate("/login"); return; }
    const address = prompt("Enter your delivery address:");
    if (!address) return;
    try {
      await API.post("/orders", {
        paintingId: painting._id,
        orderType: "buy",
        deliveryAddress: address,
        paymentMethod: "online",
      });
      setMessage("Order placed for " + painting.title + "! Total: ₹" + (painting.buyPrice + 30));
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  const styles = ["Abstract", "Watercolor", "Oil Painting", "Portrait", "Landscape", "Floral", "Acrylic", "Sketch"];

  const dropdownStyle = {
    backgroundColor: "#fff",
    border: "1px solid #E8D5C0",
    fontFamily: "'Lato', sans-serif",
    fontSize: "16px",
    padding: "10px 16px",
    borderRadius: "4px",
    color: "#2A1A0A",
    cursor: "pointer",
    minWidth: "180px",
  };

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "48px 32px" }}>

      {/* Header */}
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "48px", color: "#7B1818", marginBottom: "8px" }}>
        Buy Paintings
      </h1>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#C45E0A", marginBottom: "32px" }}>
        Original paintings by talented artists
      </p>

      {message && (
        <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "16px 20px", borderRadius: "8px", marginBottom: "24px", fontSize: "18px", fontFamily: "'Lato', sans-serif" }}>
          {message}
        </div>
      )}

      {/* Filter Bar */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "40px", flexWrap: "wrap" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "#A07850" }}>Filter by:</p>

        <select style={dropdownStyle} value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
          <option value="">All Styles</option>
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select style={dropdownStyle} value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">Any Price</option>
          <option value="under1000">Under ₹1,000</option>
          <option value="1000to3000">₹1,000 - ₹3,000</option>
          <option value="above3000">Above ₹3,000</option>
        </select>

        <select style={dropdownStyle} value={artistFilter} onChange={(e) => setArtistFilter(e.target.value)}>
          <option value="">All Artists</option>
          {artists.map((a) => (
            <option key={a._id} value={a._id}>{a.fullName}</option>
          ))}
        </select>
      </div>

      {/* Paintings Grid */}
      {filtered.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#A07850", fontFamily: "'Lato', sans-serif" }}>
          No paintings found.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
          {filtered.map((p) => (
            <div
              key={p._id}
              style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C45E0A"; e.currentTarget.style.transform = "scale(1.01)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8D5C0"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              {/* Image */}
              <div style={{ width: "100%", height: "200px", backgroundColor: "#FEF7F0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => e.target.style.display = "none"} />
                ) : (
                  <span style={{ fontSize: "48px" }}>🖼️</span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#7B1818", marginBottom: "4px", fontWeight: 600 }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#A07850", marginBottom: "6px" }}>
                  by {p.artistName}
                </p>

                {/* Style Tag */}
                <span style={{ backgroundColor: "#FEF7F0", color: "#C45E0A", fontFamily: "'Cinzel', serif", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "14px" }}>
                  {p.style}
                </span>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "24px", fontWeight: "bold", color: "#C45E0A" }}>
                    ₹{p.buyPrice}
                  </p>
                  {(p.availableFor === "buy" || p.availableFor === "both") && (
                    <button
                      onClick={() => handleBuy(p)}
                      style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "12px 24px", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}