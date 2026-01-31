import { useState } from "react";
import { post } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // University email check (frontend guard)
    if (!form.email.endsWith("@dsu.edu.in")) {
      return setError("Use your official university email");
    }

    setLoading(true);

    const res = await post("/auth/register", form);

    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem("token", res.token);
      nav("/profile-setup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="University Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}