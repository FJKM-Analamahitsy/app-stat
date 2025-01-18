import { userSetAction } from "@redux/actions";
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
      .get("auth", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (pathname === "/") {
          navigate("/home");
        }
        dispatch(userSetAction(res.data));
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
