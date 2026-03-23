import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isAdmin ? "/auth/admin/login" : "/auth/login";
      const res = await API.post(url, form);
      login(res.data.token, res.data.role);

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "artist") navigate("/artist");
      else if (res.data.role === "customer") navigate("/buy");
      else if (res.data.role === "delivery") navigate("/delivery");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white border border-orange-200 rounded-xl p-10 w-full max-w-md shadow">
        <h2 className="text-4xl font-bold text-maroon mb-2 text-center">
          Login
        </h2>
        <p className="text-center text-saffron font-semibold mb-8 text-lg">
          ChitraSangam Arts
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 font-bold p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-3 rounded font-bold text-lg ${
              !isAdmin
                ? "bg-saffron text-white"
                : "border border-saffron text-saffron"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-3 rounded font-bold text-lg ${
              isAdmin
                ? "bg-maroon text-white"
                : "border border-maroon text-maroon"
            }`}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-darkink font-bold text-lg mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-saffron text-white font-bold text-xl py-4 rounded hover:bg-gold mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-lg text-darkink">
          New customer?{" "}
          <Link to="/signup" className="text-saffron font-bold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}