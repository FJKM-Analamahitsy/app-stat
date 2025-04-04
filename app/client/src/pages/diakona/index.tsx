import Avatar from "@components/Avatar";
import api from "@utils/api";
import { ANTOKO_DIAKONE, FARITRA } from "@utils/constant";
import { memberStatus } from "@utils/helper";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Ondry from "./Ondry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Diakona: FC = () => {
  const [filter, setFilter] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Anarana",
        sortable: true,
        cell: (row) => {
          return (
            <div onClick={() => navigate("/christian/" + row._id)} className="">
              <Avatar
                label={`${row.fullname}`}
                className={memberStatus(row.lastPayDate, true)}
              />
            </div>
          );
        },
        grow: 2,
      },
      {
        name: "Faritra",
        cell: (row) => <p className="capitalize">{row.place}</p>,
      },
      {
        name: "Zone",
        cell: (row) => row.zone,
        center: true,
      },
      {
        name: "Antoko",
        cell: (row) => <p className="capitalize">{row.antoko}</p>,
        center: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <Ondry diacre={row}>
            <FontAwesomeIcon icon={solid("file-lines")} size="xl" />
          </Ondry>
        ),
        center: true,
      },
    ],
    []
  );
  useEffect(() => {
    const query = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => {
      v && v !== "" && query.set(k, v as string);
    });
    api.get(`/diacre?${query.toString()}`).then((res) => {
      setData(res.data);
    });
  }, [filter]);
  return (
    <div className="h-full bg-white p-4">
      <div className="flex justify-between">
        <p className="text-lg font-medium">Diakona - {data.length}</p>
        <div className="flex gap-3">
          <select
            className="p-1 px-2 border rounded"
            onChange={(e) => {
              setFilter({ ...filter, sampana: e.target.value });
            }}
          >
            <option value="">Tous</option>
            <option value="DIAKONA">Diakona</option>
            <option value="FLD">FLD</option>
          </select>
          <select
            className="p-1 px-2 border rounded"
            onChange={(e) => {
              setFilter({ ...filter, antoko: e.target.value });
            }}
          >
            <option value="">Tous</option>
            {ANTOKO_DIAKONE.map((a) => {
              return <option value={a}>{a}</option>;
            })}
          </select>

          <select
            className="p-1 px-2 border rounded"
            onChange={(e) => {
              setFilter({ ...filter, place: e.target.value.toLowerCase() });
            }}
          >
            <option value="">Tous</option>
            {FARITRA.map((a) => {
              return <option value={a}>{a}</option>;
            })}
          </select>
        </div>
      </div>
      <div>
        <DataTable
          data={data}
          columns={columns}
          className="h-[calc(100vh-170px)] !overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default Diakona;
