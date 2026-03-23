import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function PaintingsSell() {
  const [paintings, setPaintings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", artistId: "", artistName: "",
    style: "", dimensions: "", medium: "", imageUrl: "",
    buyPrice: "", artistShare: "", rentPricePerDay: "",
    depositAmount: "", quantityInStock: "1", availableFor: "both",
  });

  const fetchData = async () => {
    try {
      const [p, a] = await Promise.all([
        API.get("/paintings"),
        API.get("/admin/artists"),
      ]);
      setPaintings(p.data);
      setArtists(a.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArtistChange = (e) => {
    const selected = artists.find((a) => a._id === e.target.value);
    setForm({
      ...form,
      artistId: e.target.value,
      artistName: selected ? selected.fullName : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/paintings", form);
      setMessage("Painting added successfully!");
      setForm({
        title: "", description: "", artistId: "", artistName: "",
        style: "", dimensions: "", medium: "", imageUrl: "",
        buyPrice: "", artistShare: "", rentPricePerDay: "",
        depositAmount: "", quantityInStock: "1", availableFor: "both",
      });
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add painting");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this painting?")) return;
    try {
      await API.delete(`/paintings/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-8">Paintings Sell</h1>

      <div className="bg-white border border-orange-200 rounded-xl p-8 mb-10 shadow">
        <h2 className="text-3xl font-bold text-maroon mb-6">Add New Painting</h2>

        {message && (
          <p className="bg-orange-100 text-saffron font-bold p-3 rounded mb-4 text-lg">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Select Artist</label>
            <select
              onChange={handleArtistChange}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
            >
              <option value="">-- Select Artist --</option>
              {artists.map((a) => (
                <option key={a._id} value={a._id}>{a.fullName}</option>
              ))}
            </select>
          </div>

          {[
            { label: "Painting Title", name: "title", type: "text" },
            { label: "Style", name: "style", type: "text" },
            { label: "Dimensions (e.g. 24x18 inches)", name: "dimensions", type: "text" },
            { label: "Medium (Oil, Watercolor etc)", name: "medium", type: "text" },
            { label: "Image URL", name: "imageUrl", type: "text" },
            { label: "Buy Price (₹)", name: "buyPrice", type: "number" },
            { label: "Artist Share (₹)", name: "artistShare", type: "number" },
            { label: "Rent Price Per Day (₹)", name: "rentPricePerDay", type: "number" },
            { label: "Security Deposit (₹)", name: "depositAmount", type: "number" },
            { label: "Quantity in Stock", name: "quantityInStock", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-darkink font-bold text-lg mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              />
            </div>
          ))}

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Available For</label>
            <select
              name="availableFor"
              value={form.availableFor}
              onChange={handleChange}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            >
              <option value="both">Buy & Rent</option>
              <option value="buy">Buy Only</option>
              <option value="rent">Rent Only</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-darkink font-bold text-lg mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-saffron text-white font-bold text-xl px-8 py-4 rounded hover:bg-gold"
            >
              Add Painting
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-3xl font-bold text-maroon mb-6">
        All Paintings ({paintings.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintings.map((p) => (
          <div key={p._id} className="bg-white border border-orange-200 rounded-xl p-6 shadow">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => e.target.style.display = "none"}
              />
            )}
            <h3 className="text-2xl font-bold text-maroon mb-1">{p.title}</h3>
            <p className="text-lg text-darkink mb-1">By {p.artistName}</p>
            <p className="text-lg text-darkink mb-1">Style: {p.style}</p>
            <p className="text-saffron font-bold text-xl mb-1">Buy: ₹{p.buyPrice}</p>
            <p className="text-lg text-darkink mb-1">Rent: ₹{p.rentPricePerDay}/day</p>
            <p className="text-lg text-darkink mb-4">Stock: {p.quantityInStock}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="bg-maroon text-white font-bold px-4 py-2 rounded text-lg hover:opacity-80"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}