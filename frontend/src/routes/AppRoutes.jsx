import { BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Upcoming from "../pages/dashboard/Upcoming";
import Overdue from "../pages/dashboard/Overdue";
import ResetSuccess from "../pages/auth/ResetSuccess";
import ProtectedRoute from "./ProtectedRoute";
// import Profile from "../pages/dashboard/Profile";


const AppRoutes = () => {   
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                <Route path="/upcoming" element={<ProtectedRoute><Upcoming/></ProtectedRoute>}/>
                <Route path="/overdue" element={<ProtectedRoute><Overdue/></ProtectedRoute>}/> 
                <Route path="/reset-success" element={<ResetSuccess />} />
                {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;



