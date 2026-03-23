import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function FinanceTally() {
  const [tally, setTally] = useState(null);

  useEffect(() => {
    const fetchTally = async () => {
      try {
        const res = await API.get("/finance/tally");
        setTally(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTally();
  }, []);

  if (!tally) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-maroon">Loading Finance Tally...</h1>
      </div>
    );
  }

  const items = [
    { label: "Total Orders Delivered", value: tally.totalOrders, color: "text-darkink" },
    { label: "Total Collected (₹)", value: `₹${tally.totalCollected}`, color: "text-saffron" },
    { label: "Paid to Artists (₹)", value: `₹${tally.totalArtistShare}`, color: "text-maroon" },
    { label: "Delivery Charges (₹)", value: `₹${tally.totalDeliveryCharge}`, color: "text-maroon" },
    { label: "Razorpay Fees (₹)", value: `₹${tally.totalRazorpayFee}`, color: "text-maroon" },
    { label: "Admin Net Profit (₹)", value: `₹${tally.totalAdminProfit}`, color: "text-green-700" },
    { label: "COD Pending (₹)", value: `₹${tally.totalCODPending}`, color: "text-yellow-700" },
    { label: "COD Received (₹)", value: `₹${tally.totalCODReceived}`, color: "text-green-700" },
  ];

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Finance Tally</h1>
      <p className="text-xl text-saffron font-semibold mb-10">
        Complete financial overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-orange-200 rounded-xl p-6 shadow"
          >
            <p className="text-lg text-darkink font-semibold mb-2">{item.label}</p>
            <p className={`text-4xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}