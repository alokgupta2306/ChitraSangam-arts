import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const res = await API.get("/paintings");
        setPaintings(res.data.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaintings();
  }, [user]);

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh" }}>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "80px 32px 60px" }}>

        {user?.role === "customer" ? (
          <>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "14px",
              letterSpacing: "0.35em",
              color: "#C45E0A",
              marginBottom: "16px",
            }}>
              WELCOME BACK
            </p>
            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontSize: "52px",
              color: "#7B1818",
              marginBottom: "16px",
            }}>
              Hello, Friend!
            </h1>
          </>
        ) : (
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: "64px",
            color: "#7B1818",
            marginBottom: "16px",
          }}>
            ChitraSangam Arts
          </h1>
        )}

        {/* Fading Divider */}
        <div style={{
          height: "1px",
          width: "200px",
          background: "linear-gradient(90deg, transparent, #C45E0A, transparent)",
          margin: "0 auto 20px",
        }} />

        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: "22px",
          color: "#A07850",
          marginBottom: "16px",
        }}>
          Where every stroke tells a story
        </p>

        <p style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "18px",
          color: "#5A3A20",
          maxWidth: "560px",
          margin: "0 auto 40px",
          lineHeight: "1.8",
        }}>
          Discover original paintings by Mumbai's finest artists.
          Buy, rent, or commission something made just for you.
        </p>

        {/* 3 Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/buy")}
            style={{
              backgroundColor: "#C45E0A",
              color: "#fff",
              fontFamily: "Cinzel, serif",
              fontSize: "16px",
              padding: "16px 32px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Browse Paintings
          </button>
          <button
            onClick={() => navigate("/rent")}
            style={{
              backgroundColor: "transparent",
              color: "#C45E0A",
              fontFamily: "Cinzel, serif",
              fontSize: "16px",
              padding: "16px 32px",
              border: "2px solid #C45E0A",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Rent Paintings
          </button>
          <button
            onClick={() => navigate("/customize")}
            style={{
              backgroundColor: "#7B1818",
              color: "#fff",
              fontFamily: "Cinzel, serif",
              fontSize: "16px",
              padding: "16px 32px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Custom Order
          </button>
        </div>
      </div>

      {/* Featured Paintings Section */}
      <div style={{ backgroundColor: "#FEF7F0", padding: "60px 32px" }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: "13px",
          letterSpacing: "0.25em",
          color: "#C45E0A",
          textAlign: "center",
          marginBottom: "10px",
        }}>
          FEATURED PAINTINGS
        </p>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "36px",
          color: "#7B1818",
          textAlign: "center",
          marginBottom: "40px",
        }}>
          Hand-picked for you
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {paintings.length === 0 ? (
            <p style={{
              textAlign: "center",
              color: "#A07850",
              fontSize: "18px",
              gridColumn: "1/-1",
            }}>
              No paintings available yet.
            </p>
          ) : (
            paintings.map((p) => (
              <div
                key={p._id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8D5C0",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C45E0A";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E8D5C0";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => navigate("/buy")}
              >
                <div style={{
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#FEF7F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}>
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => e.target.style.display = "none"}
                    />
                  ) : (
                    <span style={{ fontSize: "48px" }}>🖼️</span>
                  )}
                </div>

                <div style={{ padding: "20px" }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "22px",
                    color: "#7B1818",
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}>
                    {p.title}
                  </p>
                  <p style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "15px",
                    color: "#A07850",
                    marginBottom: "16px",
                  }}>
                    by {p.artistName}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#C45E0A",
                    }}>
                      ₹{p.buyPrice}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate("/buy"); }}
                      style={{
                        backgroundColor: "#C45E0A",
                        color: "#fff",
                        fontFamily: "Cinzel, serif",
                        fontSize: "14px",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Want to Join Banner */}
      <div style={{
        backgroundColor: "#1A0A04",
        padding: "64px 32px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: "36px",
          color: "#F4A030",
          marginBottom: "12px",
        }}>
          Want to join ChitraSangam Arts?
        </h2>
        <p style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "18px",
          color: "#A07850",
          marginBottom: "28px",
        }}>
          Are you an artist or want to work as a delivery partner?
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/join"
            style={{
              backgroundColor: "#C45E0A",
              color: "#fff",
              fontFamily: "Cinzel, serif",
              fontSize: "16px",
              padding: "14px 32px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Join as Artist
          </Link>
          <Link
            to="/join"
            style={{
              backgroundColor: "transparent",
              color: "#C45E0A",
              fontFamily: "Cinzel, serif",
              fontSize: "16px",
              padding: "14px 32px",
              border: "2px solid #C45E0A",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Delivery Partner
          </Link>
        </div>
      </div>

    </div>
  );
}