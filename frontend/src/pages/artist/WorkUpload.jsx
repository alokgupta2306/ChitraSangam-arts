import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function WorkUpload() {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ assignmentId: "", submittedImageUrl: "" });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/assignments/my");
        setAssignments(res.data.filter((a) => a.status !== "completed"));
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.put(`/assignments/submit/${form.assignmentId}`, {
        submittedImageUrl: form.submittedImageUrl,
      });
      setMessage("Work submitted successfully! Admin will review it.");
      setForm({ assignmentId: "", submittedImageUrl: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Upload Work</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        Submit your completed painting
      </p>

      <div className="bg-white border border-orange-200 rounded-xl p-8 shadow max-w-xl">
        {message && (
          <p className="bg-green-100 text-green-800 font-bold p-3 rounded mb-4 text-lg">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Select Assignment
            </label>
            <select
              value={form.assignmentId}
              onChange={(e) => setForm({ ...form, assignmentId: e.target.value })}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
            >
              <option value="">-- Select Assignment --</option>
              {assignments.map((a) => (
                <option key={a._id} value={a._id}>{a.topic}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Painting Image URL
            </label>
            <input
              type="text"
              value={form.submittedImageUrl}
              onChange={(e) => setForm({ ...form, submittedImageUrl: e.target.value })}
              required
              placeholder="Paste image URL here"
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
            />
          </div>

          <button
            type="submit"
            className="bg-saffron text-white font-bold text-xl py-4 rounded hover:bg-gold"
          >
            Submit Work
          </button>
        </form>
      </div>
    </div>
  );
}