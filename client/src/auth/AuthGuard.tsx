import useAuth from "@hooks/useAuth";
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard: FC = () => {
  const { isLogged, loading } = useAuth();
  const { pathname } = useLocation();

  if (!loading && !isLogged && pathname !== "/") {
    return <Navigate to="/" />;
  }

  if (!loading && isLogged && pathname === "/") {
    console.log(isLogged);
    return <Navigate to="/home" />;
  }

  return <>{loading ? <p>loading...</p> : <Outlet />}</>;
};

export default AuthGuard;
