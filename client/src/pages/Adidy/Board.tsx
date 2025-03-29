import Avatar from "@components/Avatar";
import RecapExpand from "@containers/RecapExpand";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const ComptBoard: FC = () => {
  const [data, setData] = useState<any>([]);
  const [query] = useSearchParams();
  const [filter, setfilter] = useState<any>({
    date: query.get("date") ?? dayjs().format("YYYY-MM-DD"),
    type: query.get("type") ?? "",
    culte: query.get("culte") ?? "",
  });

  const [type, setType] = useState<any>([]);
  const [title, setTitle] = useState("");
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Date",
        cell: (row) =>
          row._id ? dayjs(row._id.date).format("DD MMM, YYYY") : "Total",
      },
      {
        name: "Diacre",
        cell: (row) => row._id && <Avatar label={row._id.createBy} />,
      },
      {
        name: "Chretien",
        center: true,
        cell: (row) => row.count,
      },
      {
        name: "Montant",
        center: true,
        cell: (row) => Intl.NumberFormat("de-FR").format(row.sum) + " MGA",
      },
    ],
    []
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    contentRef,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(query);
    Object.keys(filter).forEach((k: any) => {
      if (filter[k] && filter[k] !== "") {
        params.set(k, filter[k]);
      } else {
        params.delete(k);
      }
    });
    navigate(`/adidy?${params.toString()}`);
    api.get(`/adidy/summary/daily?${params.toString()}`).then((res) => {
      setData(res.data);
    });
  }, [filter]);

  useEffect(() => {
    api.get("adidy/type").then((res) => setType(res.data));
  }, []);
  return (
    <div className="bg-white h-full p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <input
            type="date"
            className="bg-bg p-2 rounded"
            value={filter.date}
            onChange={(e) =>
              setfilter({
                ...filter,
                date: dayjs(e.target.value).format("YYYY-MM-DD"),
              })
            }
          />
          <select
            className="border rounded p-2"
            value={filter.type}
            onChange={(e) => {
              const val = e.target.value;
              setfilter({ ...filter, type: val });
              setTitle(
                val === "" ? "" : type.filter((t: any) => t._id === val)[0].name
              );
            }}
          >
            <option value="">tous</option>
            {type.map((t: any, i: number) => {
              return (
                <option key={i} value={t._id}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <select
            className="border rounded p-2"
            value={filter.culte.toString()}
            onChange={(e) => {
              setfilter({ ...filter, culte: e.target.value });
            }}
          >
            <option value="">tous</option>
            <option value="1">Premier culte</option>
            <option value="2">Deuxieme culte</option>
          </select>
        </div>
        <button
          className="bg-primary text-white p-1 px-4 rounded flex gap-3 items-center"
          onClick={() => print()}
        >
          <FontAwesomeIcon icon={solid("print")} size="sm" /> Imprimer
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        className="h-[calc(100vh-180px)] !overflow-y-auto"
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={RecapExpand}
      />
      <div className="hidden">
        <div ref={contentRef} className="p-6">
          <div className="text-center mb-5">
            <p>FIANGONAN'I JESOA KRISTY ETO MADAGASIKARA</p>
            <p>FITANDREMANA ANALAMAHITSY SPIA 19</p>
            <p className="my-3 flex items-center justify-center gap-2">
              <span className="mt-2">************************</span>
              <FontAwesomeIcon icon={solid("church")} />
              <span className="mt-2">************************</span>
            </p>
            <p className="font-medium">
              Recaputilation adidy -{" "}
              <span className="text-primary">
                {dayjs(filter.date).format("MMM DD, YYYY")}
              </span>
            </p>
            <p>{title}</p>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ComptBoard;
