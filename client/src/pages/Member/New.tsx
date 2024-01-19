import Button from "@components/Button";
import InputNew from "@components/InputNew";
import RadioButton from "@components/RadioButton";
import api from "@utils/api";
import Layout from "layout";
import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ContainerProps {
  title: string;
  children: ReactNode;
  childClass?: string;
}

const Container: FC<ContainerProps> = ({ title, children, childClass }) => {
  return (
    <div className="border border-bg rounded-[5px] p-4 hover:bg-slate-50">
      <h2 className="font-semibold">{title}</h2>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 my-4 ${childClass}`}
      >
        {children}
      </div>
    </div>
  );
};

const NewMember: FC = () => {
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get("/member/" + id).then((res) => setData(res.data));
    } else {
      setData({});
    }
  }, [id]);

  const onChangeHandler = (e: any) => {
    setDataHandler(e.target.name, e.target.value);
  };
  const setDataHandler = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };
  return (
    <Layout>
      <form
        onChange={onChangeHandler}
        onSubmit={async (e) => {
          e.preventDefault();
          if (id) {
            await api
              .put("/member", { ...data, id: data._id })
              .then(() => navigate("/list"))
              .catch((err) => console.log(err));
          } else {
            await api
              .post("/member", data)
              .then(() => navigate("/list"))
              .catch((err) => console.log(err));
          }
        }}
      >
        <div className="px-[2rem] py-[3rem] flex flex-col gap-4">
          <Container title="General">
            <InputNew
              label="Anarana"
              name="name"
              required
              value={data.name ? data.name : ""}
              onChange={onChangeHandler}
            />
            <InputNew
              label="Fanampiny"
              name="forname"
              value={data.forname ? data.forname : ""}
              onChange={onChangeHandler}
            />
            <div className="grid grid-cols-3">
              <RadioButton
                name="gender"
                value="lehilahy"
                onChange={onChangeHandler}
                checked={data.gender === "lehilahy"}
                onClick={() => setDataHandler("gender", "lehilahy")}
              />

              <RadioButton
                name="gender"
                value="vehivavy"
                onChange={onChangeHandler}
                checked={data.gender === "vehivavy"}
                onClick={() => setDataHandler("gender", "vehivavy")}
              />

              <input
                type="date"
                name="brithdate"
                id=""
                className="border px-2 rounded-[5px] h-[40px] text-grey uppercase"
              />
            </div>
            <InputNew
              label="Toerana nahaterahana"
              name="birthplace"
              value={data.birthplace ? data.birthplace : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Batisa">
            <div className="grid grid-cols-3">
              <RadioButton
                name="baptism"
                value="eny"
                onChange={onChangeHandler}
                checked={data.baptism === "eny"}
                onClick={() => setDataHandler("baptism", "eny")}
              />
              <RadioButton
                name="baptism"
                value="tsia"
                onChange={onChangeHandler}
                checked={data.baptism === "tsia"}
                onClick={() => setDataHandler("baptism", "tsia")}
              />
            </div>
            <InputNew
              label="Taona"
              type="number"
              min={1800}
              max={2050}
              name="baptismYear"
              value={data.baptismYear ? data.baptismYear : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Mpandray">
            <div className="grid grid-cols-3">
              <RadioButton
                name="mpandray"
                value="eny"
                onChange={onChangeHandler}
                checked={data.mpandray === "eny"}
                onClick={() => setDataHandler("mpandray", "eny")}
              />
              <RadioButton
                name="mpandray"
                value="tsia"
                onChange={onChangeHandler}
                checked={data.mpandray === "tsia"}
                onClick={() => setDataHandler("mpandray", "tsia")}
              />

              <InputNew
                label="Andiany"
                name="mpandrayAndiany"
                value={data.mpandrayAndiany ? data.mpandrayAndiany : ""}
                onChange={onChangeHandler}
              />
            </div>
            <InputNew
              label="N° Karatra"
              name="mpandrayN"
              value={data.mpandrayN ? data.mpandrayN : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Adress">
            <InputNew
              label="Home"
              name="home"
              value={data.home ? data.home : ""}
              onChange={onChangeHandler}
            />
            <InputNew
              label="Tanana"
              name="city"
              value={data.city ? data.city : ""}
              onChange={onChangeHandler}
            />
            <select
              name="place"
              id=""
              className="border px-2 rounded-[5px] text-grey h-[40px] outline-none"
              value={data.place ? data.place : ""}
              onChange={onChangeHandler}
            >
              <option value="" defaultChecked>
                Faritra
              </option>
              <option value="atsimo">Atsimo</option>
              <option value="avaratra">Avaratra</option>
              <option value="atsinanana">Atsinanana</option>
              <option value="andrefana">Andrefana</option>
            </select>
          </Container>

          <Container title="Asa">
            <div className="grid grid-cols-3">
              <RadioButton
                name="job"
                value="tena"
                onChange={onChangeHandler}
                checked={data.job === "tena"}
                onClick={() => setDataHandler("job", "tena")}
              />
              <RadioButton
                name="job"
                value="tsy miankina"
                onChange={onChangeHandler}
                checked={data.job === "tsy miankina"}
                onClick={() => setDataHandler("job", "tsy miankina")}
              />
              <RadioButton
                name="job"
                value="fanjakana"
                onChange={onChangeHandler}
                checked={data.job === "fanjakana"}
                onClick={() => setDataHandler("job", "fanjakana")}
              />
            </div>
            <InputNew
              label="Talenta"
              name="talent"
              value={data.talent ? data.talent : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Contact">
            <InputNew
              label="Telephone"
              name="phone"
              value={data.phone ? data.phone : ""}
              onChange={onChangeHandler}
            />
            <InputNew
              label="Mail"
              name="mail"
              value={data.mail ? data.mail : ""}
              onChange={onChangeHandler}
            />
            <InputNew
              label="facebook"
              name="fb"
              value={data.fb ? data.fb : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Hobby">
            <InputNew
              label="Fialamboly"
              name="hobby"
              value={data.hobby ? data.hobby : ""}
              onChange={onChangeHandler}
            />
            <InputNew
              label="Fanatanjahatena"
              name="sport"
              value={data.sport ? data.sport : ""}
              onChange={onChangeHandler}
            />
          </Container>

          <Container title="Other" childClass="!grid-cols-1">
            <textarea
              name="other"
              id=""
              className="border px-2 rounded-[5px] text-grey h-[10vh] outline-none w-full"
              placeholder="fanamarihana manokana"
              value={data.other ? data.other : ""}
              onChange={onChangeHandler}
            ></textarea>
          </Container>

          <div className="text-right mt-4">
            <Button className="text-white bg-primary w-1/3 sm:w-1/4">
              save
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default NewMember;
