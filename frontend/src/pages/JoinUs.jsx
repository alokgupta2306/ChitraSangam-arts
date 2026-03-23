import { useState } from "react";
import API from "../api/axios";

export default function JoinUs() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    roleApplied: "artist",
    paintingStyles: "",
    availability: "full-time",
    vehicleType: "bike",
    coverageArea: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        ...form,
        paintingStyles:
          form.roleApplied === "artist"
            ? form.paintingStyles.split(",").map((s) => s.trim())
            : [],
      };
      await API.post("/join/apply", payload);
      setMessage(
        "Thank you for applying! We will contact you shortly."
      );
      setForm({
        fullName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
        roleApplied: "artist",
        paintingStyles: "",
        availability: "full-time",
        vehicleType: "bike",
        coverageArea: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Want to Join Us?</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        Apply as an Artist or Delivery Partner
      </p>

      {message && (
        <div className="bg-green-100 text-green-800 font-bold p-4 rounded-xl mb-6 text-lg">
          {message}
        </div>
      )}

      <div className="bg-white border border-orange-200 rounded-xl p-8 shadow max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Role Selection */}
          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Applying As
            </label>
            <select
              name="roleApplied"
              value={form.roleApplied}
              onChange={handleChange}
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            >
              <option value="artist">Artist</option>
              <option value="delivery">Delivery Partner</option>
            </select>
          </div>

          {/* Common Fields */}
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-darkink font-bold text-lg mb-1">
                {field.label}
              </label>
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

          {/* Artist Fields */}
          {form.roleApplied === "artist" && (
            <>
              <div>
                <label className="block text-darkink font-bold text-lg mb-1">
                  Painting Styles (comma separated)
                </label>
                <input
                  type="text"
                  name="paintingStyles"
                  value={form.paintingStyles}
                  onChange={handleChange}
                  placeholder="Watercolor, Portrait, Oil painting..."
                  className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
                />
              </div>
              <div>
                <label className="block text-darkink font-bold text-lg mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                </select>
              </div>
            </>
          )}

          {/* Delivery Partner Fields */}
          {form.roleApplied === "delivery" && (
            <>
              <div>
                <label className="block text-darkink font-bold text-lg mb-1">
                  Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
                >
                  <option value="bike">Bike</option>
                  <option value="cycle">Cycle</option>
                  <option value="car">Car</option>
                  <option value="foot">On Foot</option>
                </select>
              </div>
              <div>
                <label className="block text-darkink font-bold text-lg mb-1">
                  Coverage Area
                </label>
                <input
                  type="text"
                  name="coverageArea"
                  value={form.coverageArea}
                  onChange={handleChange}
                  placeholder="Which areas of Mumbai can you deliver to?"
                  className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
                />
              </div>
              <div>
                <label className="block text-darkink font-bold text-lg mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-saffron text-white font-bold text-xl py-4 rounded hover:bg-gold"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}