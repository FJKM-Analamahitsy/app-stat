import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import api from "@utils/api";
import { FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";

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

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (data) {
      api.patch("/users/" + data._id, input).then((res) => {
        success && success();
        form.current?.reset();
        modal.current.close();
      });
    } else {
      api.post("/users", input).then((res) => {
        success && success();
        form.current?.reset();
      });
    }
  };

  useEffect(() => {
    data && setInput(data);
  }, [data]);
  return (
    <Modal ref={modal}>
      <>{children}</>
      <form ref={form} onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <p>username</p>
          <Input
            placeholder="rakoto"
            name="username"
            required
            value={input.username}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <p>password</p>
          <Input
            type="password"
            placeholder="******"
            name="password"
            required
            value={input.password}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <p>profile</p>
          <select
            name="profile"
            required
            defaultValue={input.profile}
            onChange={onChangeHandler}
            className="h-[40px] w-full min-w-[200px] bg-bg rounded-[5px] flex items-center gap-[10px] px-[10px]"
          >
            <option value="">select</option>
            {profile.map((v, i) => {
              return <option value={v._id}>{v.name}</option>;
            })}
          </select>
        </div>

        <Button className="bg-primary text-white">Create</Button>
      </form>
    </Modal>
  );
};

export default FormUser;
