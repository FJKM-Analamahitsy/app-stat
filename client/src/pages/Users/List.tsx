import { FC, useEffect, useMemo, useState } from "react";
import FormUser from "./FormUser";
import Button from "@components/Button";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import DataTable, { TableColumn } from "react-data-table-component";

const UserList: FC = () => {
  const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const fetch = () => {
    api.get("/users").then((res) => {
      setData(res.data);
    });
  };

  const getProfile = () => {
    api.get("/profile").then((res) => {
      setProfiles(res.data);
    });
  };

  const onDelete = (id: string) => {
    api.delete(`/users/${id}`).then(() => {
      fetch();
    });
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.username,
      },
      {
        name: "Profile",
        selector: (row) => row.profile.name,
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <div className="flex gap-4">
              <FormUser
                data={{ ...row, profile: row.profile._id }}
                profile={profiles}
                success={fetch}
              >
                <FontAwesomeIcon icon={solid("edit")} />
              </FormUser>
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
    getProfile();
  }, []);
  return (
    <div className="bg-white p-4 h-full">
      <div>
        <FormUser profile={profiles} success={fetch}>
          <Button className="bg-primary text-white max-w-[200px]">New</Button>
        </FormUser>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserList;
