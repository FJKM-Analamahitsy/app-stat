import Avatar from "@components/Avatar";
import api from "@utils/api";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const ComptBoard: FC = () => {
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "date",
        cell: (row) => dayjs(row._id.date).format("DD-MMM-YYYY"),
      },
      {
        name: "Diakona",
        cell: (row) => <Avatar label={row._id.createBy} />,
      },
      {
        name: "Mpino",
        center: true,
        cell: (row) => row.count,
      },
      {
        name: "Montant",
        center: true,
        cell: (row) => Intl.NumberFormat("de-FR").format(row.sum) + " MGA",
      },
    ],
    []
  );
  useEffect(() => {
    api.get(`/adidy/summary/daily?date=${date}`).then((res) => {
      setData(res.data);
    });
  }, [date]);
  return (
    <div className="bg-white h-full p-4">
      <div>
        <input
          type="date"
          className="bg-bg p-2 rounded mr-3"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          onChange={(e) => setDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
        />
      </div>
      <div>
        <DataTable columns={columns} data={data} striped highlightOnHover />
      </div>
    </div>
  );
};

export default ComptBoard;
