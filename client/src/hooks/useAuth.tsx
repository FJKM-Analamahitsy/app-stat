import { userSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";
import api from "@utils/api";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useAppDispatch();

  const fetch = () => {
    return api
      .get("auth")
      .then((res) => {
        dispatch(userSetAction(res.data));
        setIsLogged(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return { isLogged, setIsLogged, loading, fetch };
};

export default useAuth;
