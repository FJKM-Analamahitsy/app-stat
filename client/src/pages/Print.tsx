import Receipt from "@containers/Receipt";
import api from "@utils/api";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PrintPage: FC = () => {
  const [data, setData] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    data && window.print();
  }, [data]);
  useEffect(() => {
    api.get(`/adidy/byid/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);
  return <>{data && <Receipt data={data} />}</>;
};

export default PrintPage;
