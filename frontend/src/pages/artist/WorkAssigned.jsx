import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function WorkAssigned() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/assignments/my");
        setAssignments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Work Assigned</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        All assignments given to you
      </p>

      {assignments.length === 0 ? (
        <p className="text-xl text-darkink">No assignments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((a) => (
            <div key={a._id} className="bg-white border border-orange-200 rounded-xl p-6 shadow">
              <h3 className="text-2xl font-bold text-maroon mb-1">{a.topic}</h3>
              <p className="text-lg text-darkink mb-1">Style: {a.paintingStyle}</p>
              <p className="text-lg text-darkink mb-1">Notes: {a.notes}</p>
              <p className="text-lg text-darkink mb-3">
                Due: {new Date(a.dueDate).toLocaleDateString()}
              </p>
              <span className={`font-bold text-lg px-3 py-1 rounded ${
                a.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : a.status === "inProgress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-orange-100 text-saffron"
              }`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}