import { FC, ReactNode, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

interface ConfirmProps {
  children: ReactNode;
  title?: string;
  type?: string;
  text?: string;
  onContinue: () => void;
}

const Confirm: FC<ConfirmProps> = ({
  children,
  type = "le fournisseur",
  title = "Confirmer",
  text,
  onContinue,
}) => {
  const [loading, setLoading] = useState(false);
  const refDelModal = useRef<any>(null);
  return (
    <Modal ref={refDelModal}>
      <div onClick={() => setLoading(false)}>{children}</div>
      <div className="bg-white p-6 rounded text-base overflow-hidden relative m-8 min-w-[20vw]">
        <div className="w-full absolute left-0 top-0 bg-secondary h-1" />
        <h3 className="text-black font-semibold">{title} ?</h3>
        {text ? (
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        ) : (
          <p className="max-w-[400px] my-1">
            Attention! <br />
            cette action est irréversible et supprimera{" "}
            <span className="font-semibold">{type}</span> définitivement.
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            onContinue();
          }}
          className="flex justify-end mt-4 gap-3"
        >
          <Button
            className="bg-gray-200 text-white"
            onClick={() => refDelModal.current.close()}
          >
            annuler
          </Button>
          <Button
            autoFocus
            type="submit"
            className="bg-secondary text-white "
            disabled={loading}
          >
            continuer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default Confirm;
