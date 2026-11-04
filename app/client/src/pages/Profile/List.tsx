import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Confirm from "@components/Confirm";
import Table from "@components/Table";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, useEffect, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfileList: FC = () => {
  const [data, setData] = useState([]);

  const fetch = () => {
    api.get("/profile").then((res) => {
      setData(res.data);
    });
  };

  const onDelete = (id: string) => {
    const request = api.delete(`/profile/${id}`).then(() => {
      fetch();
    });
    toast.promise(request, {
      loading: "En attente...",
      success: "Données supprimées avec succès",
      error: "Une erreur se produit.",
    });
    return request;
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Name",
        cell: (row) => {
          return <Avatar label={row.name} />;
        },
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <div className="flex justify-evenly items-center w-full">
              <Link to={row._id}>
                <FontAwesomeIcon icon={solid("edit")} />
              </Link>
              <Confirm
                onContinue={() => {
                  return onDelete(row._id);
                }}
              >
                <FontAwesomeIcon icon={solid("trash")} />
              </Confirm>
            </div>
          );
        },
        center: true,
      },
    ],
    // eslint-disable-next-line
    [],
  );

  useEffect(
    () => {
      fetch();
    },
    // eslint-disable-next-line
    [],
  );
  return (
    <div className="bg-white h-full p-4">
      <Link to="new" className="flex">
        <Button className="bg-primary text-white min-w-[150px]">
          <FontAwesomeIcon icon={solid("add")} className="mr-2" /> Nouveau
        </Button>
      </Link>
      <div className="mt-4">
        <Table
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          className="h-[calc(100vh-250px)] !overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default ProfileList;
