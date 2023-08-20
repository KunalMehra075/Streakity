import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const { isAuth, ElectronDetail, token } = useSelector(
    (store) => store.ElectronAuthManager
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !ElectronDetail && !token) {
      navigate("/admin-login");
    }
  }, [isAuth]);

  return <>{children}</>;
};

export default PrivateAdminRoute;
