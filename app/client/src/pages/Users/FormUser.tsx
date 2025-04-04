import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  children: ReactNode;
  data?: any;
  profile: any[];
  success?: () => void;
}

const FormUser: FC<Props> = ({ children, data, profile, success }) => {
  const [input, setInput] = useState<any>({});
  const form = useRef<HTMLFormElement>(null);
  const modal = useRef<any>(null);
  const [show, setShow] = useState(false);

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    let value = e.target.value as string;
    if (name === "username") {
      value = value.toLowerCase();
    }
    setInput({ ...input, [name]: value });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    let request = new Promise(() => {});
    if (data) {
      request = api.patch("/users/" + data._id, input).then((res) => {
        success && success();
        form.current?.reset();
        modal.current.close();
      });
    } else {
      request = api.post("/users", input).then((res) => {
        success && success();
        modal.current.close();
        form.current?.reset();
      });
    }

    toast.promise(request, {
      loading: "En attente...",
      success: "Succès",
      error: "",
    });
  };

  useEffect(() => {
    data && setInput(data);
  }, [data]);
  return (
    <Modal ref={modal}>
      <>{children}</>
      <form
        ref={form}
        onSubmit={submit}
        className="flex flex-col gap-4 bg-white p-6 rounded min-w-[30vw]"
      >
        <div>
          <p className="mb-1">Nom d'utilisateur</p>
          <Input
            placeholder="rakoto"
            name="username"
            required
            value={input.username}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <p className="mb-1">Mot de passe</p>
          <Input
            type={show ? "text" : "password"}
            rightIcon={
              <FontAwesomeIcon
                icon={show ? solid("eye-slash") : solid("eye")}
                onClick={() => setShow(!show)}
                size="sm"
              />
            }
            placeholder="******"
            name="password"
            required={!data}
            value={input.password}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <p className="mb-1">Profile</p>
          <select
            name="profile"
            required
            defaultValue={input.profile}
            onChange={onChangeHandler}
            className="h-[40px] w-full min-w-[200px] bg-bg rounded-[5px] flex items-center gap-[10px] px-[10px]"
          >
            <option value="">select</option>
            {profile.map((v, i) => {
              return (
                <option key={i} value={v._id}>
                  {v.name}
                </option>
              );
            })}
          </select>
        </div>

        <Button className="bg-primary text-white mt-4">enregistrer</Button>
      </form>
    </Modal>
  );
};

export default FormUser;
