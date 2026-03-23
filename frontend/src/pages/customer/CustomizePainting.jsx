import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function CustomizePainting() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    paintingType: "", description: "", surface: "canvas",
    sizeDetails: "", colorMedium: "", frameRequired: false,
    frameType: "", deliveryAddress: "", requiredByDate: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    try {
      await API.post("/custom-orders", form);
      setMessage("Custom order placed! We will contact you within 24 hours. Delivery in 10-11 days.");
      setForm({
        fullName: "", email: "", phone: "", address: "",
        paintingType: "", description: "", surface: "canvas",
        sizeDetails: "", colorMedium: "", frameRequired: false,
        frameType: "", deliveryAddress: "", requiredByDate: "",
        additionalNotes: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to place custom order");
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Customize Painting</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        Order your dream painting — delivered in 10-11 days
      </p>

      {message && (
        <div className="bg-green-100 text-green-800 font-bold p-4 rounded-xl mb-6 text-lg">
          {message}
        </div>
      )}

      <div className="bg-white border border-orange-200 rounded-xl p-8 shadow max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Type of Painting", name: "paintingType", type: "text", placeholder: "Portrait, Landscape, Abstract..." },
            { label: "Delivery Address", name: "deliveryAddress", type: "text" },
            { label: "Required By Date", name: "requiredByDate", type: "date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-darkink font-bold text-lg mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder || ""}
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              />
            </div>
          ))}

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Surface</label>
            <select
              name="surface"
              value={form.surface}
              onChange={handleChange}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            >
              <option value="canvas">Canvas</option>
              <option value="paper">Paper</option>
            </select>
          </div>

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Size Details (e.g. 2x3 feet or A4)
            </label>
            <input
              type="text"
              name="sizeDetails"
              value={form.sizeDetails}
              onChange={handleChange}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
            />
          </div>

          {form.surface === "paper" && (
            <div>
              <label className="block text-darkink font-bold text-lg mb-1">Color Medium</label>
              <select
                name="colorMedium"
                value={form.colorMedium}
                onChange={handleChange}
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
              >
                <option value="">Select Medium</option>
                <option value="Poster color">Poster Color</option>
                <option value="Watercolor">Watercolor</option>
                <option value="Acrylic">Acrylic</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="frameRequired"
              checked={form.frameRequired}
              onChange={handleChange}
              className="w-6 h-6"
            />
            <label className="text-darkink font-bold text-lg">Frame Required?</label>
          </div>

          {form.frameRequired && (
            <div>
              <label className="block text-darkink font-bold text-lg mb-1">Frame Type</label>
              <input
                type="text"
                name="frameType"
                value={form.frameType}
                onChange={handleChange}
                placeholder="Black border / Other"
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Description / Special Requests</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              placeholder="Describe what you want..."
            />
          </div>

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={form.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-saffron text-white font-bold text-xl py-4 rounded hover:bg-gold"
          >
            Place Custom Order
          </button>
        </form>
      </div>
    </div>
  );
}