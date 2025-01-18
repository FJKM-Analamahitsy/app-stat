import Button from "@components/Button";
import Input from "@components/Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "@hooks/useAuth";
import api from "@utils/api";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import church from "@assets/img/church.svg";
import fjkm from "@assets/img/fjkm.png";

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
    const request = api.post("/auth", data).then((res) => {
      localStorage.setItem("token", res.data.token);
      getMe();
    });

    toast.promise(request, {
      loading: "En attante...",
      success: "succées",
      error: "Une erreur se produit pendant l'operation",
    });
  };
  return (
    <div className="flex w-screen h-screen bg-[#F4F7F8]">
      <div className="w-1/2 bg-primary md:flex justify-end items-end hidden relative">
        <img src={church} alt="" className="w-auto" />
        <img src={fjkm} alt="" className="absolute top-2 left-2 w-8" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-[480px]">
          <form onSubmit={login} onChange={onChangeHandler}>
            <div className="bg-white rounded-[5px] h-fit flex flex-col gap-5 px-[1rem] py-[2rem] md:px-[3rem] md:py-[4rem]">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-primary">Nomery 1:2</h2>
                <p className="mt-1 italic">
                  Alao isa ny fiangonana, dia ny Zanak'Israely rehetra,araka ny
                  fokony,sy ny fianakaviany avy, ary araka ny anarany tsirairay.
                </p>
              </div>
              <Input
                leftIcon={<FontAwesomeIcon icon={solid("user")} size="sm" />}
                placeholder="Nom d'utilisateur"
                required
                name="username"
              />
              <Input
                leftIcon={<FontAwesomeIcon icon={solid("lock")} size="sm" />}
                placeholder="Mot de passe"
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
                <span>souvien de moi</span>
              </p>
              <Button className="bg-primary text-white">se connecter</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
