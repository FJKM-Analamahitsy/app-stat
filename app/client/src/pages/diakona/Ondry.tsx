import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { formatPoneNumber } from "@utils/helper";
import { FC, ReactNode, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
  children: ReactNode;
  diacre: any;
}

const Ondry: FC<Props> = ({ children, diacre }) => {
  const printarea = useRef<any>(null);
  const print = useReactToPrint({
    contentRef: printarea,
    bodyClass: "[&_*]:!text-[12px]",
  });
  const [data, setData] = useState<any[]>([]);
  const [stat, setStat] = useState({ total: 0, NbHome: 0 });

  const fetch = () => {
    if (diacre.zone) {
      api.get(`/member?zone=${diacre.zone}&ondry=true`).then((res) => {
        setData(res.data.member);
        setStat({ total: res.data.totalRow, NbHome: res.data.tokatrano });
      });
    }
  };
  return (
    <Modal>
      <div onClick={() => fetch()}>{children}</div>
      <div className="w-[70vw] bg-white border rounded">
        <div className="max-h-[70vh] overflow-y-auto [&_*]:!text-base">
          <div ref={printarea} className="p-4">
            <div className="text-center">
              <p>FIAGONAN'I JESOA KRISTY ETO MADAGASIKARA</p>
              <p>FITANDREMANA ANALAMAHITSY SPIA 19</p>
              <p className="uppercase">
                Faritra {diacre.place} - Zone {diacre.zone}
              </p>
              <p className="font-semibold my-1">
                <span className="uppercase">{diacre.name}</span>{" "}
                <span>{diacre.forname}</span>
              </p>
              <p>
                {stat.NbHome} Ankohonana - {stat.total} Mpandray
              </p>
              <p className="my-2 flex items-center justify-center gap-2">
                <span className="mt-2">************************</span>
                <FontAwesomeIcon icon={solid("church")} />
                <span className="mt-2">************************</span>
              </p>
            </div>
            <div>
              <table className="table w-full [&_td]:border [&_th]:border [&_*]:border-black [&_td]:p-1 [&_th]:p-1">
                <thead>
                  <tr>
                    <th className="text-left w-fit">ID</th>
                    <th className="text-left w-fit">Anarana</th>
                    <th className="text-left w-fit">Adiresy</th>
                    <th className="w-fit">Faritra</th>
                    <th className="w-fit">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((v) => {
                    return (
                      <tr key={v._id}>
                        <td>{v.mpandrayN}</td>
                        <td>
                          <span className="uppercase">{v.name}</span>{" "}
                          <span>{v.forname}</span>
                        </td>
                        <td>{v.home}</td>
                        <td className="text-center">{v.place}</td>
                        <td>{formatPoneNumber(v.phone)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-primary flex justify-end">
          <button
            className="bg-white p-2 px-8 border border-primary text-primary"
            onClick={() => print()}
          >
            <FontAwesomeIcon icon={solid("print")} /> Imprimer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Ondry;
