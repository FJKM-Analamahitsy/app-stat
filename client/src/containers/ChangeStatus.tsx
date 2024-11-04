import InputNew from "@components/InputNew";
import Modal from "@components/Modal";
import { FC } from "react";

interface Props {
  data: any;
}

const ChangeStatus: FC<Props> = ({ data }) => {
  console.log(data.status);
  return (
    <>
      {!data.status ? (
        <div className="relative h-5">
          <input type="checkbox" className="switch" checked={data.status} />
        </div>
      ) : (
        <Modal>
          <div className="relative h-5">
            <input
              type="checkbox"
              className="switch"
              checked={data.status}
              readOnly
            />
          </div>
          <form>
            <InputNew name="note" />
          </form>
        </Modal>
      )}
    </>
  );
};

export default ChangeStatus;
