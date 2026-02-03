import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="mb-7">
                    <h2 className="text-2xl font-semibold text-black">Join us</h2>
                    <h2 className="text-2xl font-semibold text-black">Create your ToDo account</h2>
                    <h3 className="text-sm font-normal text-gray-950 mt-2">Organize your work. Track progress. Get things done.</h3>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input type="name" placeholder="Full Name" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <input type="email" placeholder="Enter your email address" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"  />
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input type="password" placeholder="Enter your password" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black mb-4" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-900 transition">
                        Sign up
                    </button>
                </form>
                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300" />
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300" />
                </div>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-opacity">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google SVG" className="w-5 h-5" />
                        <span className="text-sm font-medium text-black">Continue with Google</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition">
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="github" className="w-5 h-5" />
                        <span className="text-sm font-medium text-black"> Continue with Github</span>
                    </button>
                </div>
            </div>
        </div>
    )

}
export default Signup;