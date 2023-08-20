import { Routes, Route } from "react-router-dom";
import UserDash from "../Components/UserComponents/UserDash";
import UserSettings from "../Components/UserComponents/UserSettings";
import ChangePassword from "../Components/Extra/ChangePassword";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDash />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/settings" element={<UserSettings />} />
    </Routes>
  );
};

export default UserRoutes;
