import { Link } from "react-router-dom";

const ForgotPassword = () =>{
    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="text-sm font-normal text-gray-950 mt-2">No worries! Enter your email below and we will send you a reset link.</p>
                </div>
                <form className="space-y-5">
                    <div>
                    <input type="email" placeholder="Enter your email address" className="w-full rounded-lg border border-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-900 transition">
                        Sent Reset Link
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-sm font-medium text-indigo-800 hover:underline">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword;

