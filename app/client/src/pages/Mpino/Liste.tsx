import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Popup from "@components/Popup";
import Search from "@components/Search";
import Select from "@components/Select";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePermission from "@hooks/usePermission";
import api from "@utils/api";
import { formatPoneNumber } from "@utils/helper";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Present from "./Present";

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
  const [filter, setFilter] = useState<any>({});
  const { canDelete, canUpdate } = usePermission("member");

  const fetch = (page: number) => {
    const request = api
      .get(
        `/member?page=${page}&limit=${limit}&${sort[0]}=${sort[1]}${
          query !== "" ? `&search=${query}` : ""
        }&${prepFilter()}`
      )
      .then((res) => {
        document
          .querySelector(".christian")
          ?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setData(res.data.member);
        setRows(res.data.totalRow);
      });

    toast.promise(request, {
      loading: "chargement...",
      success: "succées",
      error: "Une erreur se produit. veuillez reessayer plus tard.",
    });
  };

  const onChangeHandler = (page: number) => {
    setN(page);
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

  const updateGender = (gender: string, id: string) => {
    const request = api.patch(`/member/${id}`, { gender });
    toast.promise(request, {
      success: "succès",
      error: "erreur",
      loading: "En attente",
    });
  };

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Anarana",
        sortable: true,
        cell: (row) => {
          return (
            <div
              onClick={() => navigate("/christian/" + row._id)}
              className="overflow-hidden"
            >
              <Avatar
                label={`${row.fullname}`}
                className={`${
                  row.other && row.other !== ""
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>
          );
        },
        grow: 2,
      },
      {
        name: "L/V",
        cell: (row) => {
          return (
            <div>
              {canUpdate ? (
                <Select
                  key={row._id}
                  defaultValue={row.gender}
                  options={["", "lehilahy", "vehivavy"]}
                  onChange={(e) => updateGender(e.target.value, row._id)}
                  valueIndex={false}
                />
              ) : (
                <p>{row.gender}</p>
              )}
            </div>
          );
        },
        hide: 1400,
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
        center: true,
      },
      {
        name: "Ankohonana",
        sortable: true,
        selector: (row) => row.familyId,
        hide: 500,
        center: true,
      },
      {
        name: "Ankohonana",
        sortable: true,
        selector: (row) => row.home,
        hide: 1400,
        center: true,
      },
      {
        name: "Contact",
        cell: (row) => formatPoneNumber(row.phone),
        hide: 800,
      },
      {
        name: "Action",
        center: true,
        omit: !canDelete && !canUpdate,
        cell: (row) => {
          return (
            <div className="flex gap-8">
              <Present id={row._id}>
                <FontAwesomeIcon
                  icon={solid("user-check")}
                  className="cursor-pointer hover:text-primary"
                />
              </Present>

              {canUpdate && (
                <FontAwesomeIcon
                  icon={solid("user-pen")}
                  className="cursor-pointer hover:text-slate-500"
                  onClick={() => navigate("/christian/edit/" + row._id)}
                />
              )}
              {canDelete && (
                <FontAwesomeIcon
                  icon={solid("trash")}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => onDeleteHandler(row._id)}
                />
              )}
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    [navigate]
  );

  const prepFilter = () => {
    return Object.keys(filter)
      .map((k) => (filter[k] && filter[k] !== "" ? `${k}=${filter[k]}` : null))
      .filter((v) => v !== null)
      .join("&");
  };

  useEffect(
    () => {
      if (JSON.stringify(filter) !== JSON.stringify({})) {
        fetch(1);
      }
    },
    // eslint-disable-next-line
    [filter]
  );

  useEffect(
    () => {
      fetch(1);
    },
    // eslint-disable-next-line
    [query]
  );

  return (
    <div className="p-4 bg-white rounded h-full">
      <div className="flex justify-between w-full">
        <div className="w-2/5 flex gap-3">
          <div className="grow">
            <Search
              onSearch={(query) => {
                setQuery(query);
              }}
            />
          </div>

          <select
            className="border rounded"
            onChange={(e) => {
              setFilter({ ...filter, searchField: e.target.value });
            }}
          >
            <option value="all">Tous</option>
            <option value="home">Ankohonana</option>
          </select>
        </div>
        <Popup>
          <Button className="bg-bg p-2">
            <FontAwesomeIcon icon={solid("filter")} className="mr-3" /> Filtre
          </Button>
          <div className="shadow border min-w-[300px] max-h-[450px] overflow-y-auto bg-white rounded p-4 flex flex-col gap-4">
            <div>
              <p className="my-2">Mpandray</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.mpandray}
                onChange={(e) => {
                  setFilter({ ...filter, mpandray: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="eny">Eny</option>
                <option value="tsia">Tsia</option>
              </select>
            </div>

            <div>
              <p className="my-2">Batisa</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.batisa}
                onChange={(e) => {
                  setFilter({ ...filter, batisa: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="eny">Eny</option>
                <option value="tsia">Tsia</option>
              </select>
            </div>

            <div>
              <p className="my-2">Faritra</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.place}
                onChange={(e) => {
                  setFilter({ ...filter, place: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="atsimo">Atsimo</option>
                <option value="andrefana">Andrefana</option>
                <option value="atsinanana">Atsinanana</option>
                <option value="avaratra">Avaratra</option>
              </select>
            </div>

            <div>
              <p className="my-2">L/V</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.gender}
                onChange={(e) => {
                  setFilter({ ...filter, gender: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="lehilahy">Lehilahy</option>
                <option value="vehivavy">Vehivavy</option>
              </select>
            </div>

            <div>
              <p className="my-2">Statut</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.status}
                onChange={(e) => {
                  setFilter({ ...filter, status: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="lehilahy">Activer</option>
                <option value="vehivavy">Desactiver</option>
              </select>
            </div>

            <div>
              <p className="my-2">Remarque</p>
              <select
                className="bg-bg w-full p-3 px-1 rounded"
                value={filter.other}
                onChange={(e) => {
                  setFilter({ ...filter, other: e.target.value });
                }}
              >
                <option value="">Tous</option>
                <option value="exist">Existe</option>
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
          className="h-[calc(100vh-250px)] !overflow-y-auto christian"
        />
      </div>
    </div>
  );
};

export default Liste;
