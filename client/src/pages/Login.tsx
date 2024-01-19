import Button from "@components/Button";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";
import api from "@utils/api";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const login = async (e: any) => {
    e.preventDefault();
    await api.post("/auth", data).then((res) => {
      sessionStorage.setItem("token", res.data.token);
      dispatch(userSetAction({ username: data.username }));
      navigate("/home");
    });
  };
  return (
    <div className="flex w-screen h-screen bg-[#F4F7F8]">
      <div className="w-1/2 bg-primary hidden md:block"></div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-[480px]">
          <div className="w-full flex justify-end px-1 py-2">
            <Logo />
          </div>
          <form onSubmit={login} onChange={onChangeHandler}>
            <div className="bg-white rounded-[5px] h-fit flex flex-col gap-5 px-[3rem] py-[5rem]">
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
