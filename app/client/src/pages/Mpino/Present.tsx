import Input from "@components/Input";
import Modal from "@components/Modal";
import api from "@utils/api";
import dayjs from "dayjs";
import { FC, ReactNode, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  children: ReactNode;
}

const Present: FC<Props> = ({ children, id }) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const modal = useRef<any>(null);
  const onAddAttendance = () => {
    const req = api.post("/attendance/" + id, { date }).then(() => {
      modal.current.close();
    });
    toast.promise(req, {
      loading: "En attente...",
      error: "error",
      success: "succes",
    });
  };
  return (
    <Modal ref={modal}>
      <>{children}</>
      <div className="p-4 rounded bg-white min-w-[400px]">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-slate-200 p-2 rounded px-4 text-slate-600"
            onClick={() => {
              modal.current.close();
            }}
          >
            annuler
          </button>
          <button
            className="bg-primary p-2 rounded px-4 text-white"
            onClick={onAddAttendance}
          >
            enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Present;
