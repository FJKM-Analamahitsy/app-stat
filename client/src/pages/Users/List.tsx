import { FC, useEffect, useMemo, useState } from "react";
import FormUser from "./FormUser";
import Button from "@components/Button";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import DataTable, { TableColumn } from "react-data-table-component";
import Avatar from "@components/Avatar";

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
        cell: (row) => {
          return <Avatar label={row.username} />;
        },
        sortable: true,
      },
      {
        name: "Profile",
        selector: (row) => row.profile.name,
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <div className="flex justify-evenly items-center w-full">
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
    // eslint-disable-next-line
    [onDelete]
  );

  useEffect(() => {
    fetch();
    getProfile();
  }, []);
  return (
    <div className="bg-white p-4 h-full overflow-y-auto">
      <div>
        <FormUser profile={profiles} success={fetch}>
          <Button className="bg-primary text-white min-w-[150px]">
            <FontAwesomeIcon icon={solid("add")} className="mr-2" /> Nouveau
          </Button>
        </FormUser>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 50, 100, 200]}
          className="h-[calc(100vh-250px)] !overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default UserList;
