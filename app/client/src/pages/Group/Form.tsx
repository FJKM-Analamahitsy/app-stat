import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import api from "@utils/api";
import { FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  children: ReactNode;
  onSuccess: () => void;
  data?: any;
}

const FormGroup: FC<Props> = ({ children, onSuccess, data }) => {
  const modal = useRef<any>(null);
  const [name, setName] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() != "") {
      let request = new Promise(() => {});
      if (data) {
        request = api.patch(`/group/${data._id}`, { name }).then(() => {
          setName("");
          modal.current.close();
          onSuccess();
        });
      } else {
        request = api.post("/group", { name }).then(() => {
          setName("");
          modal.current.close();
          onSuccess();
        });
      }

      toast.promise(request, {
        loading: "En attente...",
        success: "Succès",
        error: "Error",
      });
    }
  };

  return (
    <Modal ref={modal}>
      <div
        onClick={() => {
          data && setName(data.name);
        }}
      >
        {children}
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col gap-4 bg-white p-6 rounded min-w-[30vw]"
      >
        <div>
          <p className="mb-1">Nom du groupe</p>
          <Input
            placeholder="Nom"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            className="bg-slate-100 text-slate-600 mt-4"
            type="button"
            onClick={() => {
              setName("");
              modal.current.close();
            }}
          >
            annuler
          </Button>
          <Button className="bg-primary text-white mt-4">enregistrer</Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormGroup;
