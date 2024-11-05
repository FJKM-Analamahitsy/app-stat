import Avatar from "@components/Avatar";
import Button from "@components/Button";
import ExportBtn from "@components/ExportBtn";
import Popup from "@components/Popup";
import Search from "@components/Search";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { formatPoneNumber, memberStatus } from "@utils/helper";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DataRow {
  [key: string]: string;
}

const Liste: FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);
  const [sort, setSort] = useState<any>(["anarana", "asc"]);
  const [n, setN] = useState<number>(1);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const fetch = (page: number) => {
    api
      .get(
        `/member?page=${page}&limit=${limit}&${sort[0]}=${sort[1]}&search=${query}`
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
            <div onClick={() => navigate("/christian/" + row._id)} className="">
              <Avatar
                label={`${row.name} ${row.forname ? row.forname : ""}`}
                className={memberStatus(row.lastPayDate, true)}
              />
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

  useEffect(() => {
    if (query.trim() !== "") {
      fetch(n);
    } else {
      fetch(1);
    }
  }, [query]);

  useEffect(
    () => {
      fetch(1);
    }, // eslint-disable-next-line
    []
  );
  return (
    <div className="p-4 bg-white rounded h-full">
      <div className="flex justify-between w-full">
        <div className="w-2/5">
          <Search
            onSearch={(query) => {
              setN(1);
              setQuery(query);
            }}
          />
        </div>
        <Popup>
          <Button className="bg-bg">
            <FontAwesomeIcon icon={solid("filter")} className="mr-3" /> Filtre
          </Button>
          <div className="shadow border min-w-[300px] max-h-[450px] overflow-y-auto bg-white rounded p-4 flex flex-col gap-4">
            <div>
              <p className="my-2">Mpandray</p>
              <select className="bg-bg w-full p-3 px-1 rounded">
                <option value="">Tous</option>
                <option value="eny">Eny</option>
                <option value="tsia">Tsia</option>
              </select>
            </div>

            <div>
              <p className="my-2">Batisa</p>
              <select className="bg-bg w-full p-3 px-1 rounded">
                <option value="">Tous</option>
                <option value="eny">Eny</option>
                <option value="tsia">Tsia</option>
              </select>
            </div>

            <div>
              <p className="my-2">Faritra</p>
              <select className="bg-bg w-full p-3 px-1 rounded">
                <option value="">Tous</option>
                <option value="atsimo">Atsimo</option>
                <option value="andrefana">Andrefana</option>
                <option value="atsinanana">Atsinanana</option>
                <option value="avaratra">Avaratra</option>
              </select>
            </div>

            <div>
              <p className="my-2">L/V</p>
              <select className="bg-bg w-full p-3 px-1 rounded">
                <option value="">Tous</option>
                <option value="lehilahy">Lehilahy</option>
                <option value="vehivavy">Vehivavy</option>
              </select>
            </div>

            <div>
              <p className="my-2">Statut</p>
              <select className="bg-bg w-full p-3 px-1 rounded">
                <option value="">Tous</option>
                <option value="lehilahy">Activer</option>
                <option value="vehivavy">Desactiver</option>
              </select>
            </div>
          </div>
        </Popup>
      </div>

      <div className="mt-4">
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
    </div>
  );
};

export default Liste;
