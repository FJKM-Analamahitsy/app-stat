import useAuth from "@hooks/useAuth";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthGuard: FC = () => {
  const { loading, getMe } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMe();
  }, []);

  return <>{loading ? <p>loading...</p> : <Outlet />}</>;
};

export default AuthGuard;
