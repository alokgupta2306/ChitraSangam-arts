import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navLinkStyle = {
    fontFamily: "Lato, sans-serif",
    fontSize: "14px",
    color: isAdmin ? "#C8A880" : "#6A3A18",
    textDecoration: "none",
  };

  const mobileLinkStyle = {
    fontFamily: "Lato, sans-serif",
    fontSize: "18px",
    color: isAdmin ? "#C8A880" : "#6A3A18",
    textDecoration: "none",
    padding: "14px 0",
    borderBottom: isAdmin ? "1px solid #3A2010" : "1px solid #E8D5C0",
    display: "block",
  };

  const getLinks = () => {
    if (!user) return [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/join", label: "Join Us" },
    ];
    if (user.role === "admin") return [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/artists", label: "Artists" },
      { to: "/admin/delivery-partners", label: "Delivery" },
      { to: "/admin/paintings", label: "Paintings" },
      { to: "/admin/assign-delivery", label: "Assign Delivery" },
      { to: "/admin/work-distributor", label: "Work" },
      { to: "/admin/finance", label: "Finance" },
      { to: "/admin/paintings-sold", label: "Sold" },
    ];
    if (user.role === "artist") return [
      { to: "/artist", label: "Dashboard" },
      { to: "/artist/work-assigned", label: "Work Assigned" },
      { to: "/artist/work-upload", label: "Upload Work" },
      { to: "/artist/earnings", label: "Earnings" },
    ];
    if (user.role === "customer") return [
      { to: "/buy", label: "Buy" },
      { to: "/rent", label: "Rent" },
      { to: "/customize", label: "Customize" },
      { to: "/track", label: "Track Order" },
      { to: "/about", label: "About" },
    ];
    if (user.role === "delivery") return [
      { to: "/delivery", label: "Dashboard" },
      { to: "/delivery/my-deliveries", label: "My Orders" },
    ];
    return [];
  };

  const links = getLinks();

  return (
    <>
      <nav style={{
        backgroundColor: isAdmin ? "#1A0A04" : "#FFFAF5",
        borderBottom: isAdmin ? "1px solid #3A2010" : "1px solid #E8D5C0",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
          <Logo dark={isAdmin} />
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }} className="desktop-nav">
          {links.map((link) => (
            <Link key={link.to} to={link.to} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: isAdmin ? "#F4A030" : "#C45E0A",
                color: isAdmin ? "#1A0A04" : "#FFFFFF",
                fontFamily: "Cinzel, serif",
                fontSize: "12px",
                letterSpacing: "0.05em",
                padding: "8px 18px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                backgroundColor: "#C45E0A",
                color: "#FFFFFF",
                fontFamily: "Cinzel, serif",
                fontSize: "12px",
                letterSpacing: "0.05em",
                padding: "8px 18px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          <div style={{ width: "24px", height: "2px", backgroundColor: isAdmin ? "#F4A030" : "#C45E0A" }} />
          <div style={{ width: "24px", height: "2px", backgroundColor: isAdmin ? "#F4A030" : "#C45E0A" }} />
          <div style={{ width: "24px", height: "2px", backgroundColor: isAdmin ? "#F4A030" : "#C45E0A" }} />
        </button>

      </nav>

      {/* Mobile Slide-out Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "280px",
          height: "100vh",
          backgroundColor: isAdmin ? "#1A0A04" : "#FFFAF5",
          borderLeft: isAdmin ? "1px solid #3A2010" : "1px solid #E8D5C0",
          zIndex: 999,
          padding: "24px",
          overflowY: "auto",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
        }}>

          {/* Close Button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "24px", color: isAdmin ? "#F4A030" : "#C45E0A" }}
            >
              ✕
            </button>
          </div>

          {/* Mobile Logo */}
          <div style={{ marginBottom: "24px" }}>
            <Logo dark={isAdmin} />
          </div>

          {/* Mobile Links */}
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={mobileLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Logout/Login */}
          <div style={{ marginTop: "24px" }}>
            {user ? (
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  backgroundColor: isAdmin ? "#F4A030" : "#C45E0A",
                  color: isAdmin ? "#1A0A04" : "#fff",
                  fontFamily: "Cinzel, serif",
                  fontSize: "16px",
                  padding: "14px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  backgroundColor: "#C45E0A",
                  color: "#fff",
                  fontFamily: "Cinzel, serif",
                  fontSize: "16px",
                  padding: "14px",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
          </div>

        </div>
      )}

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}
    </>
  );
}