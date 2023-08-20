import { Routes, Route } from "react-router-dom";

import AdminLogin from "../Pages/AdminLogin";
import UserLogin from "../Pages/UserLogin";
import UserDashboard from "../Pages/UserDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import PrivateAdminRoute from "./PrivateAdmin";
import PrivateUserRoute from "./PrivateUser";
import WebsiteLayout from "../Components/WebsiteComponents/WebsiteLayout";
import Homepage from "../Pages/Homepage";

import ForgotPassword from "../Components/Extra/ForgotPassword";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminLogin />} />
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Homepage />} />
      </Route>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <PrivateAdminRoute>
            <AdminDashboard />
          </PrivateAdminRoute>
        }
      />
      <Route path="/user-login" element={<UserLogin />} />
      <Route
        path="/user/*"
        element={
          <PrivateUserRoute>
            <UserDashboard />
          </PrivateUserRoute>
        }
      />
      <Route path="/user/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AllRoutes;
