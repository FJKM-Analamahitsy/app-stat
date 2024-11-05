import api from "@utils/api";
import { FAMILYRANK } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
}

const Family: FC<Props> = ({ data }) => {
  const [family, setFamily] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    data.familyId &&
      api.get(`/member/family/${data.familyId}`).then((data: any) => {
        setFamily(data.data);
      });
  }, [data]);
  return (
    <div className="p-4">
      <div>
        <div className="flex flex-wrap gap-6">
          {family.map((fam: any, i: number) => {
            return (
              <div
                onClick={() => navigate("/christian/" + fam._id)}
                className={`cursor-pointer p-6 max-w-[300px] rounded border w-full ${
                  fam._id === data._id ? "bg-primary text-white" : "hover:bg-bg"
                }`}
                key={i}
              >
                <div className={`flex flex-col items-center gap-4`}>
                  <div
                    className="rounded-full bg-bg flex border-2 border-white justify-center items-center cursor-pointer overflow-hidden"
                    style={{ width: 60, height: 60 }}
                  >
                    <span className="font-medium text-grey uppercase">
                      {fam.name.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold truncate max-w-[280px] text-center">
                      {fam.fullname}
                    </p>
                    <p className="text-center">
                      {FAMILYRANK[fam.familyRank - 1]}{" "}
                      {fam.famHead ? "(Loha-mpianakaviana)" : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Family;
