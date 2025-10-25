import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api, { getData } from "@utils/api";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const Attendance: FC = () => {
  const [day, setDay] = useState<string>();
  const { data = [], mutate } = useSWR(
    `/attendance${day ? `?day=${day}` : ""}`,
    getData
  );
  const navigate = useNavigate();

  const onDeleteHandler = (id: string) => {
    const conf = window.confirm("Are you sure to proceed to this action?");
    if (conf) {
      const req = api.delete("/attendance/" + id).then(() => mutate());
      toast.promise(req, {
        loading: "En attente...",
        error: "error",
        success: "succes",
      });
    }
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Anarana",
        sortable: true,
        cell: (row) => {
          return (
            <div onClick={() => navigate("/christian/" + row._id)}>
              <Avatar label={`${row.member.fullname}`} />
            </div>
          );
        },
        grow: 2,
      },
      {
        name: "L/V",
        selector: (row) => row.member.gender,
        hide: 500,
      },
      {
        name: "Action",
        center: true,
        cell: (row) => {
          return (
            <div className="flex gap-8">
              <FontAwesomeIcon
                icon={solid("trash")}
                className="cursor-pointer hover:text-red-500"
                onClick={() => onDeleteHandler(row._id)}
              />
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
  );
  return (
    <div className="p-4 bg-white rounded h-full" id="list">
      <div className="flex justify-between my-2">
        <div>
          <button
            className="p-2 bg-primary text-white rounded mr-3"
            onClick={mutate}
          >
            <FontAwesomeIcon icon={solid("sync-alt")} />
          </button>
          <input
            type="date"
            className="bg-bg p-2 rounded"
            value={day}
            onChange={(e) => setDay(dayjs(e.target.value).format("YYYY-MM-DD"))}
          />
        </div>
        <p className="font-medium text-lg">{data.length} present</p>
      </div>

      <DataTable
        columns={columns}
        data={data}
        className="h-[calc(100vh-250px)] !overflow-y-auto"
      />
    </div>
  );
};

export default Attendance;
