import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

interface Props {
  name: string;
}

const QrCode: FC<Props> = ({ name }) => {
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
    [id]
  );
  return (
    <Modal
      ref={modal}
      className="flex justify-center items-center  bg-primary rounded px-4"
    >
      <button className="">
        <FontAwesomeIcon
          icon={solid("qrcode")}
          size="lg"
          className="text-white"
        />
      </button>
      <div className="bg-white rounded p-4">
        <div ref={contentRef}>
          <QRCode value={token} />
          <p className="text-lg">{name}</p>
        </div>
        <div className="mt-4">
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
            imprimer qrcode
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QrCode;
