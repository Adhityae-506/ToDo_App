import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
            📬
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">
          Reset password
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Please kindly set your new password.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          
          {/* New password */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-full border border-green-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Strength bar (UI only) */}
            <div className="mt-2">
              <div className="h-1 rounded-full bg-green-500 w-full" />
              <p className="text-xs text-green-600 mt-1">
                Password strength: <span className="font-medium">Excellent</span>
              </p>
            </div>
          </div>

          {/* Confirm password */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Re-enter password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-full font-medium hover:bg-orange-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
