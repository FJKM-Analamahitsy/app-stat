import Button from "@components/Button";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

const Login: FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="flex w-screen h-screen bg-[#F4F7F8]">
      <div className="w-1/2 bg-primary hidden md:block"></div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-[480px]">
          <div className="w-full flex justify-end px-1 py-2">
            <Logo />
          </div>
          <div className="bg-white rounded-[5px] h-fit flex flex-col gap-5 px-[3rem] py-[5rem]">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <p className="mb-[1rem]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page
            </p>
            <Input
              leftIcon={<FontAwesomeIcon icon={solid("user")} size="sm" />}
              placeholder="Username"
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
            />
            <p className="text-right">
              <input type="checkbox" className="m-1" />
              <span>keep me sign in</span>
            </p>
            <Button className="bg-primary text-white">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
