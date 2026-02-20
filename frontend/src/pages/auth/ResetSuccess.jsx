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

                <button className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition disabled:opacity-50"><Link to="/login">Go to login</Link></button>
            </div>
        </div>
    );
};

export default ResetSuccess;