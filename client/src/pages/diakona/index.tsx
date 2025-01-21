import Avatar from "@components/Avatar";
import Select from "@components/Select";
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
    query.set("sampana", "DIAKONA");
    Object.entries(filter).forEach(([k, v]) => {
      query.set(k, v as string);
    });
    api.get(`/member?${query.toString()}`).then((res) => {
      setData(res.data.member);
    });
  }, []);
  return (
    <div className="h-full bg-white p-4">
      <div className="flex justify-between">
        <p className="text-lg font-medium">Diakona</p>
        <div className="flex gap-3">
          <Select
            options={ANTOKO_DIAKONE}
            onChange={(e) => {
              setFilter({ ...filter, antoko: e.target.value.toLowerCase() });
            }}
            valueIndex={false}
          />
          <Select
            options={FARITRA}
            onChange={(e) => {
              setFilter({ ...filter, place: e.target.value.toLowerCase() });
            }}
            valueIndex={false}
          />
        </div>
      </div>
      <div>
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Diakona;
