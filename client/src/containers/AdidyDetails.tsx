import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useParams } from "react-router-dom";

interface AdidyRow {
  created_at: string;
  type: string;
  pay: string;
}

const AdidyDetails: FC = () => {
  const years = useState([
    ...Array.from(Array(3).keys()).map((i) =>
      (new Date().getFullYear() - i).toString()
    ),
  ])[0];
  const [data, setData] = useState<AdidyRow[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { id } = useParams();
  const [adMpandray, setAdMpandray] =
    useState<{ year: number; month: number }[]>();

  const fetch = (page: number) => {
    api.get(`/adidy?page=${page}&limit=${limit}&id=${id}`).then((res) => {
      setData(res.data.member);
      setRows(res.data.totalRow);
    });
  };

  const onChangeHandler = (page: number) => {
    fetch(page);
  };

  const onLimitChange = (limit: number, page: number) => {
    api.get(`/adidy?page=${page}&limit=${limit}&id=${id}`).then((res) => {
      setData(res.data.member);
      setLimit(limit);
    });
  };

  const columns: TableColumn<AdidyRow>[] = useMemo(
    () => [
      {
        name: "Date",
        cell: (row) => {
          return (
            <div>
              <p>{new Date(row.created_at).toDateString()}</p>
              <p>{new Date(row.created_at).toLocaleTimeString()}</p>
            </div>
          );
        },
      },
      {
        name: "Adidy",
        selector: (row) => row.type,
      },
      {
        name: "Vola",
        selector: (row) => row.pay,
      },
    ],
    // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      fetch(1);
      api.get(`/adidy/mpandray?id=${id}`).then((res) => {
        setAdMpandray(res.data);
      });
    }, // eslint-disable-next-line
    []
  );
  return (
    <div>
      <h3 className="font-medium">Adidy Mpandray</h3>
      <div className="overflow-x-auto py-2">
        <div className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-2 items-center">
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
              className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-2 items-center"
            >
              <div className="sticky left-0 bg-white">{yrs}</div>
              {Array.from(Array(12).keys()).map((i) => {
                const isPayed = adMpandray?.filter(
                  (ad) => ad.year === parseInt(yrs) && ad.month === i + 1
                );
                return (
                  <div
                    key={i}
                    className={`w-[12px] h-[12px] ${
                      isPayed && isPayed.length > 0 && "bg-primary"
                    } m-auto rounded-[2px]`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <h3 className="font-medium mt-8">Adidy Samihafa</h3>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={rows}
        onChangePage={onChangeHandler}
        onChangeRowsPerPage={onLimitChange}
      />
    </div>
  );
};

export default AdidyDetails;
