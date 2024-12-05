import { FC, ReactNode, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";

interface ConfirmProps {
  children: ReactNode;
  title?: string;
  text?: string;
  onContinue: () => Promise<any>;
}

const Confirm: FC<ConfirmProps> = ({
  children,
  title = "Confirmer",
  text,
  onContinue,
}) => {
  const modal = useRef<any>(null);
  return (
    <Modal ref={modal}>
      <div>{children}</div>
      <div className="bg-white p-6 rounded text-base overflow-hidden relative m-8 min-w-[20vw]">
        <div className="w-full absolute left-0 top-0 bg-secondary h-1" />
        <h3 className="text-black font-semibold">{title} ?</h3>
        {text ? (
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        ) : (
          <p className="max-w-[400px] my-1">
            Attention! <br />
            cette action est irréversible et supprimera ce donneé
            définitivement.
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onContinue().then(() => {
              modal.current.close();
            });
          }}
          className="flex justify-end mt-4 gap-3"
        >
          <Button
            className="bg-gray-200 text-white"
            onClick={() => modal.current.close()}
          >
            annuler
          </Button>
          <Button autoFocus type="submit" className="bg-primary text-white ">
            continuer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default Confirm;
