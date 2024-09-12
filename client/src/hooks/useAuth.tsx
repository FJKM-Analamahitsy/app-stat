import { userSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";
import api from "@utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getMe = () => {
    setLoading(true);
    return api
      .get("auth")
      .then((res) => {
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
