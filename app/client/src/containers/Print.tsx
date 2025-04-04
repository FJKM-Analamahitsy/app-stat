import { FC, FormEvent, ReactNode, useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./Receipt";
import Modal from "@components/Modal";
import { server } from "@utils/api";
import toast from "react-hot-toast";

interface Props {
  children: ReactNode;
  data: any;
  onsuccess?: () => void;
}

const Print: FC<Props> = ({ children, data, onsuccess }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<any>(1);
  const modal = useRef<any>(null);
  const print = useReactToPrint({
    contentRef,
    onAfterPrint() {
      onsuccess && onsuccess();
    },
  });

  const onPrint = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const dataToPrint = {
        data: data,
        printer: {
          adress: localStorage.getItem("xprinter") || "192.168.3.100",
          port: 9100,
          copy: parseInt(value),
        },
      };
      server
        .post(
          `http://${
            localStorage.getItem("xpserver") || "localhost"
          }:30116/receipt`,
          dataToPrint
        )
        .then(() => {
          toast.success("Success");
        })
        .catch((err) => {
          toast.error("Une erreur se produit pendant l'operation");
        });
    },
    [value]
  );

  const isXprinter = localStorage.getItem("xptype") === "third-party";

  return (
    <>
      {isXprinter ? (
        <Modal ref={modal}>
          <div>{children}</div>
          <form
            className="min-w-[35vw] bg-white p-4 rounded"
            onSubmit={onPrint}
          >
            <p className="font-medium text-lg mb-4">Lancer une impression</p>
            <input
              type="number"
              className="bg-slate-100 p-2 w-full rounded"
              value={value}
              required
              min={1}
              onChange={(e) => {
                setValue(+e.target.value);
              }}
            />
            <div className="flex gap-4 justify-end mt-4">
              <button
                type="button"
                onClick={() => modal.current.close()}
                className="bg-slate-100 text-slate-600 p-2 px-8 rounded"
              >
                annuler
              </button>
              <button className="bg-primary text-white p-2 px-8 rounded">
                imprimer
              </button>
            </div>
          </form>
        </Modal>
      ) : (
        <div>
          <div onClick={() => print()}>{children}</div>
          <div className="hidden">
            <div ref={contentRef}>
              {data.mpandray && <Receipt data={data} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Print;
