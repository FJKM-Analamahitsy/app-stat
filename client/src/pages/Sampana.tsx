import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { formatPoneNumber } from "@utils/helper";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface DataRow {
  [key: string]: string;
}

const ListeSampana: FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);
  const [sort, setSort] = useState<any>(["anarana", "asc"]);
  const [n, setN] = useState<number>(1);
  const navigate = useNavigate();
  const { name } = useParams();
  const fetch = (page: number) => {
    api
      .get(
        `/member?page=${page}&limit=${limit}&${sort[0]}=${sort[1]}&sampana=${name}`
      )
      .then((res) => {
        setData(res.data.member);
        setRows(res.data.totalRow);
      });
  };

  const onChangeHandler = (page: number) => {
    setN(page);
    document
      .querySelector(".rdt_TableBody")
      ?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch(page);
  };

  const onLimitChange = (limit: number, page: number) => {
    api
      .get(`/member?page=${page}&limit=${limit}&${sort[0]}=${sort[1]}`)
      .then((res) => {
        setData(res.data.member);
        setLimit(limit);
      });
  };

  const onSortHandler = (col: TableColumn<DataRow>, sort: any, row: any) => {
    if (col.name) {
      const name = col.name.toString().toLocaleLowerCase();
      api
        .get(`/member?page=${n}&limit=${limit}&${name}=${sort}`)
        .then((res) => {
          setData(res.data.member);
          setLimit(limit);
        });
      setSort([name, sort]);
    }
  };

  const onDeleteHandler = (id: string) => {
    const conf = window.confirm("Are you sure to proceed to this action?");
    if (conf) {
      api
        .delete("/member/", { data: { id } })
        .then((res) => {
          fetch(n);
        })
        .catch(function (err) {
          toast.error(err.message);
        });
    }
  };

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Anarana",
        sortable: true,
        cell: (row) => {
          return (
            <div onClick={() => navigate("/christian/" + row._id)}>
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
        cell: (row) => formatPoneNumber(row.phone),
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
                onClick={() => navigate("/christian/edit/" + row._id)}
              />
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
    [navigate]
  );

  useEffect(
    () => {
      fetch(1);
    }, // eslint-disable-next-line
    [name]
  );
  return (
    <div className="p-4 bg-white rounded" id="list">
      <div className="flex justify-between my-2">
        <p className="text-lg font-medium">{name}</p>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={rows}
        onChangePage={onChangeHandler}
        onChangeRowsPerPage={onLimitChange}
        onRowClicked={(row) => navigate("/christian/" + row._id)}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[30, 50, 100]}
        sortServer
        onSort={onSortHandler}
        className="h-[calc(100vh-250px)] !overflow-y-auto"
      />
    </div>
  );
};

export default ListeSampana;
