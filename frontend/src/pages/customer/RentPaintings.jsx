import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function RentPaintings() {
  const [paintings, setPaintings] = useState([]);
  const [message, setMessage] = useState("");
  const [rentForm, setRentForm] = useState({ paintingId: "", days: "", address: "" });
  const [selected, setSelected] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const res = await API.get("/paintings");
        setPaintings(res.data.filter((p) => p.availableFor === "rent" || p.availableFor === "both"));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaintings();
  }, []);

  const handleSelectPainting = (p) => {
    setSelected(p);
    setRentForm({ paintingId: p._id, days: "", address: "" });
    setMessage("");
  };

  const handleRent = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    try {
      const total = selected.rentPricePerDay * rentForm.days + selected.depositAmount + 30;
      await API.post("/orders", {
        paintingId: rentForm.paintingId,
        orderType: "rent",
        deliveryAddress: rentForm.address,
        paymentMethod: "online",
        rentDays: parseInt(rentForm.days),
      });
      setMessage(`Rent order placed! Total: ₹${total} (includes ₹${selected.depositAmount} refundable deposit + ₹30 delivery)`);
      setSelected(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Rent order failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-5xl font-bold text-maroon mb-2">Rent Paintings</h1>
      <p className="text-xl text-saffron font-semibold mb-8">
        Rent paintings by the day — refundable deposit included
      </p>

      {message && (
        <div className="bg-green-100 text-green-800 font-bold p-4 rounded-xl mb-6 text-lg">
          {message}
        </div>
      )}

      {selected && (
        <div className="bg-white border-2 border-saffron rounded-xl p-8 mb-8 shadow">
          <h2 className="text-3xl font-bold text-maroon mb-4">
            Renting: {selected.title}
          </h2>
          <p className="text-xl text-darkink mb-1">Rate: ₹{selected.rentPricePerDay}/day</p>
          <p className="text-xl text-darkink mb-6">
            Security Deposit: ₹{selected.depositAmount} (refundable)
          </p>

          <form onSubmit={handleRent} className="flex flex-col gap-4">
            <div>
              <label className="block font-bold text-lg text-darkink mb-1">
                Number of Days
              </label>
              <input
                type="number"
                min="1"
                value={rentForm.days}
                onChange={(e) => setRentForm({ ...rentForm, days: e.target.value })}
                required
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
                placeholder="How many days?"
              />
              {rentForm.days && (
                <p className="text-saffron font-bold text-xl mt-2">
                  Total: ₹{selected.rentPricePerDay * rentForm.days + selected.depositAmount + 30}
                  {" "}(rent + deposit + delivery)
                </p>
              )}
            </div>
            <div>
              <label className="block font-bold text-lg text-darkink mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                value={rentForm.address}
                onChange={(e) => setRentForm({ ...rentForm, address: e.target.value })}
                required
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg"
                placeholder="Your delivery address"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-saffron text-white font-bold text-xl px-8 py-3 rounded hover:bg-gold"
              >
                Confirm Rent
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="border-2 border-maroon text-maroon font-bold text-xl px-8 py-3 rounded hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintings.map((p) => (
          <div key={p._id} className="bg-white border border-orange-200 rounded-xl shadow overflow-hidden">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-52 object-cover"
                onError={(e) => e.target.style.display = "none"}
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-maroon mb-1">{p.title}</h3>
              <p className="text-lg text-darkink mb-1">By {p.artistName}</p>
              <p className="text-3xl font-bold text-saffron mb-1">₹{p.rentPricePerDay}/day</p>
              <p className="text-lg text-darkink mb-4">
                Deposit: ₹{p.depositAmount} (refundable)
              </p>
              <button
                onClick={() => handleSelectPainting(p)}
                className="w-full bg-maroon text-white font-bold text-xl py-3 rounded hover:opacity-80"
              >
                Rent This
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}