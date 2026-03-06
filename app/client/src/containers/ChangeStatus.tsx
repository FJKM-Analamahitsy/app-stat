import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Modal from "@components/Modal";
import api from "@utils/api";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  data: any;
  onsuccess: (data: any) => void;
}

const ChangeStatus: FC<Props> = ({ data, onsuccess }) => {
  const [statusNote, setNote] = useState("");
  const modal = useRef<any>(null);
  const submit = (input: any) => {
    api.patch(`/member/${data._id}`, input).then(() => {
      onsuccess(input);
      setNote("");
      modal.current?.close();
      toast.success("success");
    });
  };
  return (
    <>
      {!data.status ? (
        <div className="relative h-5">
          <input
            type="checkbox"
            className="switch"
            checked={data.status}
            onChange={() => {
              submit({ status: true, statusNote });
            }}
          />
        </div>
      ) : (
        <Modal ref={modal} closeonclickoutside>
          <div className="relative h-4">
            <input
              type="checkbox"
              className="switch"
              checked={data.status}
              readOnly
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit({ status: false, statusNote });
            }}
            className="p-4 bg-white rounded min-w-[30vw] flex flex-col gap-4"
          >
            <p className="text-lg font-medium">Desactiver une compte</p>
            <InputNew
              name="note"
              label="note"
              required
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="text-end mt-4">
              <Button className="bg-primary text-white">Desactiver</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ChangeStatus;
