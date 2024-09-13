import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdidyDetails: FC = () => {
  const years = useState([
    ...Array.from(Array(3).keys()).map((i) =>
      (new Date().getFullYear() - i).toString()
    ),
  ])[0];
  const { id } = useParams();
  const [adMpandray, setAdMpandray] =
    useState<{ year: number; month: number }[]>();

  useEffect(
    () => {
      api.get(`/adidy/mpandray?id=${id}`).then((res) => {
        setAdMpandray(res.data);
      });
    }, // eslint-disable-next-line
    []
  );
  return (
    <div className="p-4">
      <div className="overflow-x-auto py-2">
        <div className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-1 items-center">
          <div className="sticky left-0 bg-white text-white">.</div>
          {MONTHS.map((m, i) => {
            return (
              <div key={i} className="text-ellipsis overflow-hidden m-auto">
                {m.slice(0, 3)}
              </div>
            );
          })}
        </div>
        {years.map((yrs, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-1 my-4 items-center"
            >
              <div className="sticky left-0 bg-white">{yrs}</div>
              {Array.from(Array(12).keys()).map((i) => {
                const isPayed = adMpandray?.filter(
                  (ad) => ad.year === parseInt(yrs) && ad.month === i
                );
                return (
                  <div
                    key={i}
                    className={`w-6 aspect-square ${
                      isPayed && isPayed.length > 0
                        ? "bg-primary"
                        : "bg-slate-100"
                    } m-auto rounded-[2px]`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdidyDetails;
