import Avatar from "@components/Avatar";
import Modal from "@components/Modal";
import Select from "@components/Select";
import RecapExpand from "@containers/RecapExpand";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate, useSearchParams } from "react-router-dom";
import PrintAdidy from "./Print";
import Popup from "@components/Popup";
import Button from "@components/Button";

const ComptBoard: FC = () => {
  const [data, setData] = useState<any>([]);
  const [query] = useSearchParams();
  const [filter, setfilter] = useState<any>({
    date: query.get("date") ?? dayjs().format("YYYY-MM-DD"),
    type: query.get("type") ?? "",
    culte: query.get("culte") ?? "",
  });

  const [type, setType] = useState<any>([]);
  const [title, setTitle] = useState("");
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Date",
        cell: (row) =>
          row._id ? dayjs(row._id.date).format("DD MMM, YYYY") : "Total",
      },
      {
        name: "Diacre",
        cell: (row) => row._id && <Avatar label={row._id.createBy} />,
      },
      {
        name: "Chretien",
        center: true,
        cell: (row) => row.count,
      },
      {
        name: "Montant",
        center: true,
        cell: (row) => Intl.NumberFormat("de-FR").format(row.sum) + " MGA",
      },
      {
        name: "Action",
        center: true,
        cell: (row) => {
          return (
            <>
              {row._id && (
                <Modal closeonclickoutside>
                  <button className="bg-slate-300 p-1 px-2 rounded">
                    details
                  </button>
                  <div className="bg-white rounded w-[70vw] h-[70vh]">
                    <div className="flex justify-between px-4 pt-2">
                      <div className="flex gap-2 font-medium">
                        <p>Tickets: {row.count}</p>
                        <p>
                          Montant:{" "}
                          {Intl.NumberFormat("de-FR").format(row.sum) + " MGA"}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">
                          {row._id && row._id.createBy}
                        </p>
                      </div>
                    </div>
                    <RecapExpand data={row} />
                  </div>
                </Modal>
              )}
            </>
          );
        },
      },
    ],
    []
  );

  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(query);
    Object.keys(filter).forEach((k: any) => {
      if (filter[k] && filter[k] !== "") {
        params.set(k, filter[k]);
      } else {
        params.delete(k);
      }
    });
    navigate(`/adidy?${params.toString()}`);
    api.get(`/adidy/summary/daily?${params.toString()}`).then((res) => {
      setData(res.data);
    });
  }, [filter]);

  useEffect(() => {
    api.get("adidy/type").then((res) => setType(res.data));
  }, []);
  return (
    <div className="bg-white h-full p-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="bg-bg p-2 rounded"
            value={filter.date}
            onChange={(e) =>
              setfilter({
                ...filter,
                date: dayjs(e.target.value).format("YYYY-MM-DD"),
              })
            }
          />
          <Popup className="left-0">
            <Button className="bg-bg p-2 h-11">
              <FontAwesomeIcon icon={solid("filter")} />
            </Button>
            <div className="shadow border min-w-[300px] max-h-[450px] overflow-y-auto bg-white rounded p-4 flex flex-col gap-4">
              <div>
                <p className="mb-1 text-slate-500">Type</p>
                <select
                  className="border rounded p-3 w-full"
                  value={filter.type}
                  onChange={(e) => {
                    const val = e.target.value;
                    setfilter({ ...filter, type: val });
                    setTitle(
                      val === ""
                        ? ""
                        : type.filter((t: any) => t._id === val)[0].name
                    );
                  }}
                >
                  <option value="">tous</option>
                  {type.map((t: any, i: number) => {
                    return (
                      <option key={i} value={t._id}>
                        {t.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <p className="mb-1 text-slate-500">Culte</p>
                <select
                  className="border rounded p-3 w-full"
                  value={filter.culte.toString()}
                  onChange={(e) => {
                    setfilter({ ...filter, culte: e.target.value });
                  }}
                >
                  <option value="">tous</option>
                  <option value="1">Premier culte</option>
                  <option value="2">Deuxième culte</option>
                </select>
              </div>

              <div>
                <p className="mb-1 text-slate-500">Partie</p>
                <Select
                  defaultValue={localStorage.getItem("part") || "1"}
                  onChange={(e) => {
                    setfilter({ ...filter, part: e.target.value });
                  }}
                  options={[
                    "",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                  ]}
                  valueIndex={false}
                  className="min-w-32 w-full p-3"
                />
              </div>
            </div>
          </Popup>
        </div>
        <PrintAdidy date={filter.date} title={title} data={data}>
          <button className="bg-primary text-white p-1 px-4 rounded flex gap-3 items-center">
            <FontAwesomeIcon icon={solid("print")} size="sm" /> Imprimer
          </button>
        </PrintAdidy>
      </div>
      <DataTable
        columns={columns}
        data={data}
        className="h-[calc(100vh-180px)] !overflow-y-auto"
      />
    </div>
  );
};

export default ComptBoard;
