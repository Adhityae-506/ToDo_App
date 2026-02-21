import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel =
    strength <= 1
      ? "Weak"
      : strength <= 3
      ? "Medium"
      : "Strong";

  const strengthColor =
    strength <= 1
      ? "bg-red-500"
      : strength <= 3
      ? "bg-yellow-500"
      : "bg-green-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.trim() !== confirm.trim()) {
      return setError("Passwords do not match.");
    }

    if (strength <= 1) {
      return setError("Password is too weak.");
    }

    try {
      setLoading(true);

      await API.post(`/auth/reset-password/${token}`, {
        newPassword: password.trim(),
        confirmPassword: confirm.trim(),
      });

      navigate("/reset-success");

    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Please set your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          
          <div>
            <label className="block text-sm font-medium mb-1">
              New password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-full border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {password && (
              <div className="mt-3">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Password strength:{" "}
                  <span className="font-medium">{strengthLabel}</span>
                </p>
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                className="w-full rounded-full border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-2 text-gray-500 text-sm"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;