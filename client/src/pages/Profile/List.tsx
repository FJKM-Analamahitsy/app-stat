import Button from "@components/Button";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";

const ProfileList: FC = () => {
  const [data, setData] = useState([]);

  const fetch = () => {
    api.get("/profile").then((res) => {
      setData(res.data);
    });
  };

  const onDelete = (id: string) => {
    api.delete(`/profile/${id}`).then(() => {
      fetch();
    });
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <div className="flex gap-4">
              <Link to={row._id}>
                <FontAwesomeIcon icon={solid("edit")} />
              </Link>
              <FontAwesomeIcon
                icon={solid("trash")}
                onClick={() => {
                  const conf = window.confirm("Want to proceed?");
                  if (conf) {
                    onDelete(row._id);
                  }
                }}
              />
            </div>
          );
        },
        center: true,
      },
    ],
    [onDelete]
  );

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="bg-white h-full p-4">
      <Link to="new" className="flex">
        <Button className="bg-primary text-white max-w-[200px]">New</Button>
      </Link>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProfileList;
