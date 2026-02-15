import { Link } from "react-router-dom";

const ResetSuccess = () =>{
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
                        ✓
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">Password reset successful</h1>
                <p className="text-green-500 mt-2 mb-6">Your Password has been updated. You can now sign in with your new password.</p>

                <Link to="/login" className="block w-full bg-green text-white py-2.5 rounded-lg font-medium hover:bg-green-900 transition">Go to login</Link>
            </div>
        </div>
    );
};

export default ResetSuccess;