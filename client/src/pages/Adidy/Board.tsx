import Avatar from "@components/Avatar";
import RecapExpand from "@containers/RecapExpand";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useReactToPrint } from "react-to-print";

const ComptBoard: FC = () => {
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
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
  useEffect(() => {
    api.get(`/adidy/summary/daily?date=${date}`).then((res) => {
      setData(res.data);
    });
  }, [date]);
  return (
    <div className="bg-white h-full p-4">
      <div className="flex justify-between">
        <input
          type="date"
          className="bg-bg p-2 rounded mr-3"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          onChange={(e) => setDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
        />
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
                {dayjs(date).format("MMM DD, YYYY")}
              </span>
            </p>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ComptBoard;
