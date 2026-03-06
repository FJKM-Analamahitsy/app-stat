import Modal from "@components/Modal";
import api from "@utils/api";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

interface Props {
  name: string;
  children: ReactNode;
}

const QrCode: FC<Props> = ({ name, children }) => {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const modal = useRef<any>(null);
  const contentRef = useRef(null);
  const print = useReactToPrint({
    contentRef,
  });

  useEffect(
    () => {
      if (id) {
        api.get("/member/token/" + id).then((res) => setToken(res.data.token));
      } else {
        setToken("");
      }
    }, // eslint-disable-next-line
    [id],
  );
  return (
    <Modal ref={modal}>
      <>{children}</>
      <div className="bg-white rounded p-4 flex flex-col items-center gap-4">
        <div ref={contentRef} className="flex flex-col items-center">
          <QRCode value={token} />
          <p className="text-lg">{name}</p>
        </div>
        <div>
          <button
            className="p-2 rounded px-4 bg-slate-200"
            onClick={() => {
              modal.current?.close();
            }}
          >
            fermer
          </button>
          <button
            type="button"
            onClick={() => print()}
            className="bg-primary text-white p-2 rounded ml-3"
          >
            imprimer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QrCode;
