import useAuth from "@hooks/useAuth";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const AuthGuard: FC = () => {
  const { loading, getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  return <>{loading ? <p>loading...</p> : <Outlet />}</>;
};

export default AuthGuard;
