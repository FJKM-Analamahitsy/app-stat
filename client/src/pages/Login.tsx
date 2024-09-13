import Button from "@components/Button";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "@hooks/useAuth";
import api from "@utils/api";
import { FC, useState } from "react";
import toast from "react-hot-toast";

const Login: FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { getMe } = useAuth();

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const login = (e: any) => {
    e.preventDefault();
    api
      .post("/auth", data)
      .then(() => {
        getMe();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="flex w-screen h-screen bg-[#F4F7F8]">
      <div className="w-1/2 bg-primary hidden md:block"></div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-[480px]">
          <form onSubmit={login} onChange={onChangeHandler}>
            <div className="bg-white rounded-[5px] h-fit flex flex-col gap-5 px-[1rem] py-[2rem] md:px-[3rem] md:py-[4rem]">
              <Logo />
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="mb-[1rem]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page
              </p>
              <Input
                leftIcon={<FontAwesomeIcon icon={solid("user")} size="sm" />}
                placeholder="Username"
                required
                name="username"
              />
              <Input
                leftIcon={<FontAwesomeIcon icon={solid("lock")} size="sm" />}
                placeholder="Password"
                type={showPass ? "text" : "password"}
                rightIcon={
                  <FontAwesomeIcon
                    icon={showPass ? solid("eye-slash") : solid("eye")}
                    onClick={() => setShowPass(!showPass)}
                    size="sm"
                  />
                }
                required
                name="password"
              />
              <p className="text-right">
                <input type="checkbox" className="m-1" />
                <span>keep me sign in</span>
              </p>
              <Button className="bg-primary text-white">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
