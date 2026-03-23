import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function DeliveryPartnerList() {
  const [partners, setPartners] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    gender: "", dateOfBirth: "", vehicleType: "bike", availability: "full-time",
  });

  const fetchPartners = async () => {
    try {
      const res = await API.get("/admin/delivery-partners");
      setPartners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/admin/add-delivery", form);
      setMessage("Delivery partner added successfully!");
      setForm({
        fullName: "", email: "", phone: "", address: "",
        gender: "", dateOfBirth: "", vehicleType: "bike", availability: "full-time",
      });
      fetchPartners();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add delivery partner");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this delivery partner?")) return;
    try {
      await API.delete(`/admin/delete-user/${id}`);
      fetchPartners();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-8">Delivery Partner List</h1>

      <div className="bg-white border border-orange-200 rounded-xl p-8 mb-10 shadow">
        <h2 className="text-3xl font-bold text-maroon mb-6">Add New Delivery Partner</h2>

        {message && (
          <p className="bg-orange-100 text-saffron font-bold p-3 rounded mb-4 text-lg">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
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

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Vehicle Type</label>
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
            <label className="block text-darkink font-bold text-lg mb-1">Availability</label>
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

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-saffron text-white font-bold text-xl px-8 py-4 rounded hover:bg-gold"
            >
              Add Delivery Partner
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-3xl font-bold text-maroon mb-6">
        All Delivery Partners ({partners.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner._id} className="bg-white border border-orange-200 rounded-xl p-6 shadow">
            <h3 className="text-2xl font-bold text-maroon mb-1">{partner.fullName}</h3>
            <p className="text-lg text-darkink mb-1">{partner.email}</p>
            <p className="text-lg text-darkink mb-1">{partner.phone}</p>
            <p className="text-saffron font-semibold text-lg mb-1">
              Vehicle: {partner.vehicleType}
            </p>
            <p className="text-lg text-darkink mb-4">{partner.availability}</p>
            <button
              onClick={() => handleDelete(partner._id)}
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