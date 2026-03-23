import { useNavigate } from "react-router-dom";

export default function ArtistDashboard() {
  const navigate = useNavigate();

  const cards = [
    { title: "Work Assigned", desc: "View all your assignments", path: "/artist/work-assigned", color: "bg-saffron" },
    { title: "Upload Work", desc: "Submit completed paintings", path: "/artist/work-upload", color: "bg-maroon" },
    { title: "My Earnings", desc: "View your payment history", path: "/artist/earnings", color: "bg-saffron" },
  ];

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Artist Dashboard</h1>
      <p className="text-xl text-saffron font-semibold mb-10">
        Welcome! Manage your work and earnings here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white rounded-xl p-8 cursor-pointer hover:opacity-90 shadow`}
          >
            <h2 className="text-3xl font-bold mb-2">{card.title}</h2>
            <p className="text-lg">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}