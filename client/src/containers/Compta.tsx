import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Confirm from "@components/Confirm";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import Print from "./Print";
import toast from "react-hot-toast";
import { isMobile } from "react-device-detect";

interface Props {
  className?: string;
}

const Compta: FC<Props> = ({ className }) => {
  const [data, setData] = useState<any>({});
  const [creator, setCreator] = useState<any>([]);
  const [limit, setLimit] = useState<number>(5);
  const [filter, setFilter] = useState<any>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetch = (page: number) => {
    const params = new URLSearchParams();
    Object.keys(filter).forEach((k: any) => {
      if (filter[k] && filter[k] !== "") {
        params.set(k, filter[k]);
      } else {
        params.delete(k);
      }
    });

    if (id) {
      params.set("mpandray", id);
    }
    api
      .get(`/adidy?page=${page}&limit=${limit}&${params.toString()}`)
      .then((res) => {
        setData(res.data);
      });
  };

  const onChangeHandler = (page: number) => {
    fetch(page);
  };

  const onLimitChange = (limit: number, page: number) => {
    setLimit(limit);
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Diacre",
        cell: (row) => <Avatar label={row.createBy} />,
      },
      {
        name: "Chretien",
        grow: 2,
        omit: id !== undefined,
        cell: (row) => (
          <Link to={`/christian/${row.mpandray._id}`}>
            <Avatar label={row.mpandray.fullname} />
          </Link>
        ),
      },
      {
        name: "Date",
        cell: (row) => {
          return (
            <div>
              <p>{dayjs(row.date).format("DD MMM, YYYY  HH:mm")}</p>
            </div>
          );
        },
      },
      {
        name: "Libellé",
        cell: (row) =>
          `${row.type.name} ${
            row.month.length > 1
              ? MONTHS[row.month[0]] +
                " - " +
                MONTHS[row.month[row.month.length - 1]]
              : MONTHS[row.month[0]]
          } ${row.year}`,
      },
      {
        name: "Montant",
        cell: (row) => Intl.NumberFormat("de-FR").format(row.mtt),
      },
      {
        name: "Action",
        center: true,
        cell: (row) => {
          return (
            <div className="flex justify-evenly items-center w-full">
              {isMobile ? (
                <FontAwesomeIcon
                  icon={solid("print")}
                  onClick={() => {
                    sessionStorage.setItem("prev", window.location.pathname);
                    navigate("/print/" + row._id);
                  }}
                />
              ) : (
                <Print data={row}>
                  <FontAwesomeIcon icon={solid("print")} />
                </Print>
              )}
              <Confirm
                onContinue={() => {
                  const request = api.delete("/adidy/" + row._id).then(() => {
                    fetch(1);
                  });
                  toast.promise(request, {
                    loading: "En attente...",
                    success: "Données supprimées avec succès",
                    error: "Une erreur se produit.",
                  });
                  return request;
                }}
              >
                <Button>
                  <FontAwesomeIcon icon={solid("trash")} />
                </Button>
              </Confirm>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    [data]
  );
  useEffect(
    () => {
      fetch(1);
    },
    // eslint-disable-next-line
    [filter, limit]
  );
  useEffect(() => {
    api.get("/adidy/creator").then((res) => {
      setCreator(res.data);
    });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 mt-4 md:mt-0">
          <input
            type="date"
            className="bg-bg p-2 rounded"
            onChange={(e) => setFilter({ ...filter, start: e.target.value })}
          />
          <input
            type="date"
            className="bg-bg p-2 rounded "
            onChange={(e) => setFilter({ ...filter, end: e.target.value })}
          />
          <select
            className="bg-bg p-2 rounded"
            onChange={(e) => setFilter({ ...filter, creator: e.target.value })}
          >
            <option value="">Tous</option>
            {creator.map((c: any, i: number) => {
              return (
                <option key={i} value={c._id.createBy}>
                  {c._id.createBy}
                </option>
              );
            })}
          </select>
        </div>
        <div className="font-medium text-lg">
          Total: {Intl.NumberFormat("de-FR").format(data.sum)} MGA
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data.member}
        pagination
        paginationServer
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[5, 10, 50, 100, 500]}
        paginationTotalRows={data.totalRow}
        onChangePage={onChangeHandler}
        onChangeRowsPerPage={onLimitChange}
        className={className}
      />
    </div>
  );
};

export default Compta;
