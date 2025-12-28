import { getData } from "@utils/api";
import { FC, useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";

const PrintQRPDF: FC = () => {
  const { data = [], isLoading } = useSWR("/member/get/token", getData);
  const contentRef = useRef(null);
  const print = useReactToPrint({
    contentRef,
  });

  return (
    <div>
      <div>
        <button onClick={() => print()} className="bg-slate-300 px-4 p-2">
          imprimer
        </button>
      </div>
      <div ref={contentRef} className="bg-white p-4 flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {!isLoading &&
            data.map((d: any, i: number) => {
              return (
                <div
                  key={i}
                  className="w-[200px] h-[230px] border border-black p-6 mt-4"
                >
                  <QRCode
                    value={d.token}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                  <p className="text-lg text-center my-2">{d.mpandrayN}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PrintQRPDF;
