import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney } from "@utils/helper";
import dayjs from "dayjs";
import { FC, ReactNode, useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
  children: ReactNode;
  date: any;
  title: string;
  data: any;
}

const PrintAdidy: FC<Props> = ({ children, date, title, data }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    contentRef,
  });

  return (
    <Modal closeonclickoutside>
      <>{children}</>
      <div className="modal bg-white rounded w-[70vw] h-[80vh] relative overflow-auto">
        <button
          className="p-2 bg-slate-200 rounded sticky top-2 float-right mr-2"
          onClick={() => print()}
        >
          imprimer
        </button>
        <div ref={contentRef} className="p-6">
          <div className="text-center">
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
            <p>{title}</p>
          </div>
          <div>
            <table className="table-auto w-full mt-4 [&_*]:border [&_*]:border-black">
              <thead>
                <tr>
                  <th className="text-left p-2">Diacre</th>
                  <th>Chretien</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d: any) => {
                  return (
                    <tr>
                      <td className="capitalize p-2 py-3 font-medium">
                        {d._id ? d._id.createBy : "Total"}
                      </td>
                      <td className="text-center">{d.count}</td>
                      <td className="text-center">{formatMoney(d.sum)} MGA</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PrintAdidy;
