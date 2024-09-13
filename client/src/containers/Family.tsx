import api from "@utils/api";
import { FAMILYRANK } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
  rank: number;
}

const Family: FC<Props> = ({ data, rank }) => {
  const [family, setFamily] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    data.familyId &&
      api
        .get(`/member/family/${data.familyId._id || data.familyId}`)
        .then((data: any) => {
          setFamily(data.data);
        });
  }, [data]);
  return (
    <div>
      <p>
        <span className="font-medium">Fiankohonana :</span>{" "}
        {FAMILYRANK[rank - 1]}
      </p>
      <div>
        <p className="my-3 font-medium">Fianakaviana</p>
        <div>
          {family &&
            family.map((fam: any, i: number) => {
              if (fam._id !== data._id) {
                return (
                  <div
                    onClick={() => navigate("/christian/" + fam._id)}
                    className="cursor-pointer my-4"
                    key={i}
                  >
                    <div className={`flex items-center gap-4`}>
                      <div
                        className="rounded-full bg-bg flex border-2 border-white justify-center items-center cursor-pointer overflow-hidden"
                        style={{ width: 40, height: 40 }}
                      >
                        <span className="font-medium text-grey uppercase">
                          {fam.name.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="leading-[1.1]">
                          <span className="font-semibold truncate">
                            {fam.name + " " + fam.forname}
                          </span>
                          <br />
                          <span className="block truncate w-full">
                            {FAMILYRANK[fam.familyRank - 1]}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default Family;
