import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if(result.success){
      navigate("/dashboard");
    }else{
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-950">Welcome back!</h2>
          <h2 className="text-1xl font-normal text-gray-950 mt-2">Login to manage your tasks</h2>
        </div>
        <form  onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div> 
            <label className="block text-sm font-medium text-gray-700 mb-1"> Password </label> 
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black "/> 
          </div>


          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-indigo-800 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-900 transition"
          >
            Sign in
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
        <p className="text-center text-sm text-gray-600 mt-7">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-800 font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;