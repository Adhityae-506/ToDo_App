import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strength = getStrength(password);

  const strengthLabel =
    strength <= 1 ? "Weak" : strength <= 3 ? "Medium" : "Strong";

  const strengthColor =
    strength <= 1
      ? "bg-red-500"
      : strength <= 3
        ? "bg-yellow-500"
        : "bg-green-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/signup", { name, email, password });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-7">
          {/* <h2 className="text-2xl font-semibold text-black">Join us</h2> */}
          <h2 className="text-3xl text-center font-bold text-slate-950">
            Create Account
          </h2>
          <h3 className="text-sm  text-center font-normal text-gray-950 mt-2">
            Organize your work. Track progress. Get things done.
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-md text-sm">
              {success}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-900 transition"
          >
            Sign up
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/google")
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-opacity"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google SVG"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-black">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/github";
            }}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="github"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-black">
              {" "}
              Continue with Github
            </span>
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-800 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
