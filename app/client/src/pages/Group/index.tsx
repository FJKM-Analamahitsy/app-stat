import { FC, useMemo } from "react";
import FormGroup from "./Form";
import Button from "@components/Button";
import useSWR from "swr";
import api, { getData } from "@utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DataTable, { TableColumn } from "react-data-table-component";

const Group: FC = () => {
  const { data, mutate } = useSWR("/group", getData);

  const onDelete = (id: string) => {
    api.delete(`/group/${id}`).then(() => {
      mutate();
    });
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Name",
        cell: (row) => {
          return row.name;
        },
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <div className="flex justify-evenly items-center w-full">
              <FormGroup data={{ ...row }} onSuccess={mutate}>
                <FontAwesomeIcon icon={solid("edit")} />
              </FormGroup>
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
    []
  );

  return (
    <div className="p-4 bg-white h-full">
      <FormGroup onSuccess={mutate}>
        <Button className="border border-primary text-primary">Nouveau</Button>
      </FormGroup>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={data}
          className="h-[calc(100vh-250px)] !overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default Group;
