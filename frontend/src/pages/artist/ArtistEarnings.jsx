import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function ArtistEarnings() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/assignments/my");
        setAssignments(res.data.filter((a) => a.status === "completed"));
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">My Earnings</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        All completed work
      </p>

      {assignments.length === 0 ? (
        <p className="text-xl text-darkink">No completed work yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {assignments.map((a) => (
            <div key={a._id} className="bg-white border border-orange-200 rounded-xl p-6 shadow">
              <h3 className="text-2xl font-bold text-maroon mb-1">{a.topic}</h3>
              <p className="text-lg text-darkink mb-1">Style: {a.paintingStyle}</p>
              <p className="text-lg text-darkink mb-1">
                Submitted: {new Date(a.submittedAt).toLocaleDateString()}
              </p>
              <span className="bg-green-100 text-green-700 font-bold text-lg px-3 py-1 rounded">
                Completed ✓
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}