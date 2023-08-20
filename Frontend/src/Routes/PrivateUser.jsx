import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateUserRoute = ({ children }) => {
  const { isAuth, UserDetail, token } = useSelector(
    (store) => store.UserAuthManager
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !UserDetail && !token) {
      navigate("/user-login");
    }
  }, [isAuth]);

  return <>{children}</>;
};

export default PrivateUserRoute;
