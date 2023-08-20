import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDash from "../Components/AdminComponents/AdminDash";

import AdminUser from "../Components/AdminComponents/AdminUser";
import AdminWebsite from "../Components/AdminComponents/AdminWebsite";
import AdminAddUser from "../Components/AdminComponents/AdminAddUser";
import UploadStuff from "../Components/Extra/UploadStuff";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDash />} />
      <Route path="/dashboard/upload-stuff" element={<UploadStuff />} />
      <Route path="/website" element={<AdminWebsite />} />
      <Route path="/user" element={<AdminUser />} />

      <Route path="/add-user" element={<AdminAddUser />} />
    </Routes>
  );
};

export default AdminRoutes;
