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
  data?: any;
}

const RecapExpand: FC<Props> = ({ data: input }) => {
  const [data, setData] = useState<any>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetch = () => {
    const start = dayjs(input._id.date).format("YYYY-MM-DD");
    const end = dayjs(input._id.date).add(1, "day").format("YYYY-MM-DD");
    api
      .get(`/adidy?creator=${input._id.createBy}&start=${start}&end=${end}`)
      .then((res) => {
        setData(res.data);
      });
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "#",
        cell: (row, i) => i + 1,
        maxWidth: "100px",
        center: true,
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
              <p>{dayjs(row.date).format("DD MMM, YYYY  HH:MM")}</p>
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
                    fetch();
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
      fetch();
    },
    // eslint-disable-next-line
    [input]
  );
  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={data.member}
        className="h-60 !overflow-y-auto"
      />
    </div>
  );
};

export default RecapExpand;
