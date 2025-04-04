import { sumSetAction, userSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";
import api from "@utils/api";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getMe = () => {
    setLoading(true);
    return api
      .get("auth")
      .then((res) => {
        if (pathname === "/") {
          navigate("/home");
        }
        dispatch(userSetAction(res.data));
        api.get("adidy/summary/me").then((res) => {
          if (res.data.length > 0) {
            dispatch(sumSetAction(res.data[0]));
          }
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  };

  return { loading, getMe };
};

export default useAuth;
