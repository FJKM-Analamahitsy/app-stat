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
        const culte = localStorage.getItem("culte") ?? 1;
        const part = localStorage.getItem("part") ?? 1;
        api.get(`adidy/summary/me?culte=${culte}&part=${part}`).then((res) => {
          if (res.data.sum) {
            dispatch(sumSetAction(res.data.sum));
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
