import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useFilter: any = () => {
  const [filter, setFilter] = useState<any>({});
  const [params, setParams] = useState<any>(undefined);
  const [query] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const p = new URLSearchParams(query);
    Object.keys(filter).forEach((k: any) => {
      if (filter[k] && filter[k].trim() !== "") {
        p.set(k, filter[k]);
      } else {
        p.delete(k);
      }
    });
    setParams(p.toString());
    navigate(`?${p.toString()}`);
  }, [filter]);

  return [params, setFilter];
};

export default useFilter;
