import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/signup", form);
      login(res.data.token, res.data.role);
      navigate("/buy");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white border border-orange-200 rounded-xl p-10 w-full max-w-md shadow">
        <h2 className="text-4xl font-bold text-maroon mb-2 text-center">
          Create Account
        </h2>
        <p className="text-center text-saffron font-semibold mb-8 text-lg">
          Join ChitraSangam Arts
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 font-bold p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Your full name" },
            { label: "Email", name: "email", type: "email", placeholder: "Your email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create password" },
            { label: "Phone", name: "phone", type: "text", placeholder: "Your phone number" },
            { label: "Address", name: "address", type: "text", placeholder: "Your address" },
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
                placeholder={field.placeholder}
                className="w-full border-2 border-orange-200 rounded px-4 py-3 text-lg focus:outline-none focus:border-saffron"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-saffron text-white font-bold text-xl py-4 rounded hover:bg-gold mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-lg text-darkink">
          Already have an account?{" "}
          <Link to="/login" className="text-saffron font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}