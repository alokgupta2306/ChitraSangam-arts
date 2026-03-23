import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function WorkDistributor() {
  const [artists, setArtists] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    artistId: "", topic: "", paintingStyle: "", notes: "", dueDate: "",
  });

  const fetchData = async () => {
    try {
      const [a, ass] = await Promise.all([
        API.get("/admin/artists"),
        API.get("/assignments/all"),
      ]);
      setArtists(a.data);
      setAssignments(ass.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/assignments", form);
      setMessage("Work assigned successfully!");
      setForm({ artistId: "", topic: "", paintingStyle: "", notes: "", dueDate: "" });
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to assign work");
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-8">Work Distributor</h1>

      <div className="bg-white border border-orange-200 rounded-xl p-8 mb-10 shadow">
        <h2 className="text-3xl font-bold text-maroon mb-6">Assign Work to Artist</h2>

        {message && (
          <p className="bg-orange-100 text-saffron font-bold p-3 rounded mb-4 text-lg">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-darkink font-bold text-lg mb-1">Select Artist</label>
            <select
              name="artistId"
              value={form.artistId}
              onChange={handleChange}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            >
              <option value="">-- Select Artist --</option>
              {artists.map((a) => (
                <option key={a._id} value={a._id}>{a.fullName}</option>
              ))}
            </select>
          </div>

          {[
            { label: "Topic / Title", name: "topic", type: "text" },
            { label: "Painting Style", name: "paintingStyle", type: "text" },
            { label: "Due Date", name: "dueDate", type: "date" },
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

          <div className="md:col-span-2">
            <label className="block text-darkink font-bold text-lg mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
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
              Assign Work
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-3xl font-bold text-maroon mb-6">
        All Assignments ({assignments.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((a) => (
          <div key={a._id} className="bg-white border border-orange-200 rounded-xl p-6 shadow">
            <h3 className="text-2xl font-bold text-maroon mb-1">{a.topic}</h3>
            <p className="text-lg text-darkink mb-1">
              Artist: {a.artistId?.fullName || "N/A"}
            </p>
            <p className="text-lg text-darkink mb-1">Style: {a.paintingStyle}</p>
            <p className="text-lg text-darkink mb-1">Notes: {a.notes}</p>
            <p className="text-lg text-darkink mb-1">
              Due: {new Date(a.dueDate).toLocaleDateString()}
            </p>
            <span className={`font-bold text-lg px-3 py-1 rounded ${
              a.status === "completed" ? "bg-green-100 text-green-700" :
              a.status === "inProgress" ? "bg-yellow-100 text-yellow-700" :
              "bg-orange-100 text-saffron"
            }`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}