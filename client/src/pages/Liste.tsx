import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import Layout from "layout";
import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";

interface DataRow {
  [key: string]: string;
}

const Liste: FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const customStyle: TableStyles = {
    cells: {
      style: {
        border: "0px",
      },
    },
  };
  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Anarana",
        cell: (row) => {
          return (
            <div>
              <Avatar label={`${row.name} ${row.forname ? row.forname : ""}`} />
            </div>
          );
        },
      },
      {
        name: "L/V",
        selector: (row) => row.gender,
        hide: 500,
      },
      {
        name: "Mpandray",
        sortable: true,
        selector: (row) => row.mpandray,
        hide: 800,
      },
      {
        name: "Karatra",
        sortable: true,
        selector: (row) => row.mpandrayN,
        hide: 500,
      },
      {
        name: "Contact",
        selector: (row) => row.phone,
        hide: 800,
      },
      {
        name: "Action",
        center: true,
        cell: (row) => {
          return (
            <div className="flex gap-8">
              <FontAwesomeIcon
                icon={solid("user-pen")}
                className="cursor-pointer hover:text-slate-500"
              />
              <FontAwesomeIcon
                icon={solid("trash")}
                className="cursor-pointer hover:text-red-500"
              />
            </div>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    api.get("/member").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Layout>
      <div className="p-4">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyle}
          pagination
          onRowClicked={(row) => console.log(row)}
        />
      </div>
    </Layout>
  );
};

export default Liste;
