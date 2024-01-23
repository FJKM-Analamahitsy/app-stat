import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import Layout from "layout";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

interface DataRow {
  [key: string]: string;
}

const Liste: FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const navigate = useNavigate();
  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Anarana",
        cell: (row) => {
          return (
            <div onClick={() => navigate("/member/" + row._id)}>
              <Avatar label={`${row.name} ${row.forname ? row.forname : ""}`} />
            </div>
          );
        },
        grow: 2,
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
                onClick={() => navigate("/edit/" + row._id)}
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
    [navigate]
  );
  const fetch = (page: number) => {
    api.get(`/member?page=${page}&limit=${limit}`).then((res) => {
      setData(res.data.member);
      setRows(res.data.totalRow);
    });
  };

  const onChangeHandler = (page: number) => {
    document
      .querySelector(".rdt_TableBody")
      ?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch(page);
  };

  const onLimitChange = (limit: number, page: number) => {
    api.get(`/member?page=${page}&limit=${limit}`).then((res) => {
      setData(res.data.member);
      setLimit(limit);
    });
  };
  useEffect(() => {
    fetch(1);
  }, []);
  return (
    <Layout>
      <div className="p-4">
        <a href={api.defaults.baseURL + "/member/export"} download>
          <div className="bg-primary text-white p-1 px-8 rounded-[5px] w-fit float-right cursor-pointer">
            <FontAwesomeIcon icon={solid("file-arrow-down")} />
            <span className="ml-2">Export</span>
          </div>
        </a>

        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={rows}
          onChangePage={onChangeHandler}
          onChangeRowsPerPage={onLimitChange}
          onRowClicked={(row) => navigate("/member/" + row._id)}
        />
      </div>
    </Layout>
  );
};

export default Liste;
