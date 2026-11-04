import Modal from "@components/Modal";
import api from "@utils/api";
import { FC, ReactNode, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

interface Props {
  member: any;
  children: ReactNode;
}

const QrCode: FC<Props> = ({ member, children }) => {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const modal = useRef<any>(null);
  const contentRef = useRef(null);
  const print = useReactToPrint({
    contentRef,
  });
  const [access, setAccess] = useState<any>({});

  const onShow = () => {
    if (id) {
      const items = ["A", "B", "C", "D"];
      const username = `${items[Math.floor(Math.random() * items.length)]}-${
        member.mpandrayN
      }`;
      const password = Math.floor(1000 + Math.random() * 9000);
      const payload = { username, password };
      api.patch(`/member/${member._id}`, payload).then(() => {
        setAccess(payload);
      });
      api.get("/member/token/" + id).then((res) => setToken(res.data.token));
    } else {
      setToken("");
    }
  };

  return (
    <Modal ref={modal}>
      <div onClick={onShow}>{children}</div>
      <div className="bg-white rounded p-4 flex flex-col items-center gap-4">
        <div ref={contentRef} className="flex flex-col items-center">
          <QRCode value={token} />
          <p className="text-lg font-medium">{access.username}</p>
          <p>{access.password}</p>
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
