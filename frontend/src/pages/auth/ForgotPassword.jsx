import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await API.post("/auth/forgot-password", { email });
            setMessage(res.data.message || "Reset link sent successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="text-sm font-normal text-gray-950 mt-2">
                        No worries! Enter your email below and we will send you a reset
                        link.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    {message && (
                        <p className="text-green-600 text-sm">{message}</p>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered your password?{" "}
                    <Link
                        to="/login"
                        className="text-sm font-medium text-indigo-800 hover:underline"
                    >
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
