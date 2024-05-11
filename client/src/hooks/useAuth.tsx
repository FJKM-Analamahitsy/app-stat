import { useState } from "react";

const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);

  return { isLogged };
};

export default useAuth;
