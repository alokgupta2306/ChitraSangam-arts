import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    gender: "", dateOfBirth: "", paintingStyles: "", availability: "full-time",
  });

  const fetchArtists = async () => {
    try {
      const res = await API.get("/admin/artists");
      setArtists(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchArtists(); }, []);

  // search filter
  useEffect(() => {
    if (!search) {
      setFiltered(artists);
      return;
    }
    const lower = search.toLowerCase();
    const result = artists.filter((a) =>
      a.fullName?.toLowerCase().includes(lower) ||
      a.paintingStyles?.some((s) => s.toLowerCase().includes(lower))
    );
    setFiltered(result);
  }, [search, artists]);

  // auto calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        ...form,
        paintingStyles: form.paintingStyles.split(",").map((s) => s.trim()),
      };
      await API.post("/admin/add-artist", payload);
      setMessage("Artist added successfully!");
      setForm({
        fullName: "", email: "", phone: "", address: "",
        gender: "", dateOfBirth: "", paintingStyles: "", availability: "full-time",
      });
      fetchArtists();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add artist");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this artist?")) return;
    try {
      await API.delete(`/admin/delete-user/${id}`);
      fetchArtists();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh", padding: "40px 32px" }}>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "48px", color: "#7B1818", marginBottom: "32px" }}>
        Artist List
      </h1>

      {/* Add Artist Form */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "16px", padding: "40px", marginBottom: "40px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#7B1818", marginBottom: "24px" }}>
          Add New Artist
        </h2>

        {message && (
          <p style={{ backgroundColor: "#FEF7F0", color: "#C45E0A", fontWeight: "bold", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "18px" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Gender", name: "gender", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label style={{ display: "block", fontFamily: "'Lato', sans-serif", fontWeight: "bold", fontSize: "17px", color: "#2A1A0A", marginBottom: "6px" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "12px 16px", fontSize: "17px", fontFamily: "'Lato', sans-serif", boxSizing: "border-box" }}
                />
              </div>
            ))}

            {/* Date of Birth + Age */}
            <div>
              <label style={{ display: "block", fontFamily: "'Lato', sans-serif", fontWeight: "bold", fontSize: "17px", color: "#2A1A0A", marginBottom: "6px" }}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
                style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "12px 16px", fontSize: "17px", fontFamily: "'Lato', sans-serif", boxSizing: "border-box" }}
              />
              {form.dateOfBirth && (
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#C45E0A", marginTop: "6px", fontWeight: "bold" }}>
                  Age: {calculateAge(form.dateOfBirth)} years
                </p>
              )}
            </div>

            {/* Painting Styles */}
            <div>
              <label style={{ display: "block", fontFamily: "'Lato', sans-serif", fontWeight: "bold", fontSize: "17px", color: "#2A1A0A", marginBottom: "6px" }}>
                Painting Styles (comma separated)
              </label>
              <input
                type="text"
                name="paintingStyles"
                value={form.paintingStyles}
                onChange={handleChange}
                placeholder="Watercolor, Portrait, Oil painting..."
                required
                style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "12px 16px", fontSize: "17px", fontFamily: "'Lato', sans-serif", boxSizing: "border-box" }}
              />
            </div>

            {/* Availability */}
            <div>
              <label style={{ display: "block", fontFamily: "'Lato', sans-serif", fontWeight: "bold", fontSize: "17px", color: "#2A1A0A", marginBottom: "6px" }}>
                Availability
              </label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "12px 16px", fontSize: "17px", fontFamily: "'Lato', sans-serif", boxSizing: "border-box" }}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            style={{ marginTop: "24px", backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "18px", padding: "16px 40px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Add Artist
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "28px" }}>
        <input
          type="text"
          placeholder="Search by name or painting style..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "500px", border: "2px solid #E8D5C0", borderRadius: "4px", padding: "14px 20px", fontSize: "18px", fontFamily: "'Lato', sans-serif", backgroundColor: "#fff" }}
        />
      </div>

      {/* Artist Cards */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#7B1818", marginBottom: "24px" }}>
        All Artists ({filtered.length})
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {filtered.map((artist) => (
          <div key={artist._id} style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "12px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "#7B1818", marginBottom: "8px" }}>
              {artist.fullName}
            </h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
              {artist.email}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "4px" }}>
              {artist.phone}
            </p>
            {artist.dateOfBirth && (
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#A07850", marginBottom: "4px" }}>
                Age: {calculateAge(artist.dateOfBirth)} years
              </p>
            )}
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#C45E0A", fontWeight: "bold", marginBottom: "4px" }}>
              {artist.paintingStyles?.join(", ")}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#5A3A20", marginBottom: "16px" }}>
              {artist.availability} — {artist.address}
            </p>
            <button
              onClick={() => handleDelete(artist._id)}
              style={{ backgroundColor: "#7B1818", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}