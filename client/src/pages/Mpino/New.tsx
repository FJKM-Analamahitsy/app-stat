import Button from "@components/Button";
import InputNew from "@components/InputNew";
import RadioButton from "@components/RadioButton";
import Select from "@components/Select";
import SelectMember from "@components/SelectMember";
import SelectMultiple from "@components/SelectMultiple";
import api from "@utils/api";
import { MONTHS, SAMPANA } from "@utils/constant";
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
  const [raw, setRaw] = useState<any>({});
  const [data, setData] = useState<any>({ familyRank: 1 });
  const navigate = useNavigate();
  const { id } = useParams();

  const getLastKaratra = () => {
    api.get("/member/lastKaratra").then((res) => {
      setData({ ...data, mpandray: "eny", mpandrayN: res.data });
    });
  };

  useEffect(() => {
    if (id) {
      api.get("/member/get/" + id).then((res) => {
        setData(res.data);
        setRaw(res.data);
      });
    }
  }, [id]);

  const onChangeHandler = (e: any) => {
    setDataHandler(e.target.name, e.target.value);
  };
  const setDataHandler = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };
  return (
    <form
      onChange={onChangeHandler}
      onSubmit={async (e) => {
        e.preventDefault();
        if (id) {
          await api
            .put("/member", { ...data, id: data._id })
            .then(() => navigate(`/christian/${id}`))
            .catch((err) => console.log(err));
        } else {
          await api
            .post("/member", data)
            .then(() => navigate("/christian"))
            .catch((err) => console.log(err));
        }
      }}
    >
      <div className="px-[2rem] py-[3rem] flex flex-col gap-4 bg-white">
        <Container title="Ny Tena">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

            <Select
              value={data.birthday}
              options={[...MONTHS]}
              valueIndex={false}
              name="birthday"
              onChange={onChangeHandler}
            />
          </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <RadioButton
              name="mpandray"
              value="eny"
              onChange={onChangeHandler}
              checked={data.mpandray === "eny"}
              onClick={() => {
                setDataHandler("mpandray", "eny");
                !data.mpandrayN && getLastKaratra();
              }}
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
              className="col-span-2 md:col-auto"
            />
          </div>
          <InputNew
            label="N° Karatra"
            name="mpandrayN"
            value={data.mpandrayN ? data.mpandrayN : ""}
            onChange={onChangeHandler}
          />
        </Container>

        <Container title="Fonenana">
          <InputNew
            label="Trano"
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

        <Container title="Fifandraisana">
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

        <Container title="Samihafa">
          <InputNew
            label="Fialam-boly"
            name="hobby"
            value={data.hobby ? data.hobby : ""}
            onChange={onChangeHandler}
          />
          <InputNew
            label="Fanatanjahan-tena"
            name="sport"
            value={data.sport ? data.sport : ""}
            onChange={onChangeHandler}
          />
        </Container>

        <Container title="Ankohonana">
          <SelectMember
            label="Raim-pianakaviana"
            onSelected={(m) => setData({ ...data, familyId: m._id })}
            defaultValue={
              typeof data.familyId === "object"
                ? `${data.familyId.name} ${data.familyId.forname}`
                : ""
            }
          />
          <select
            className="rounded border"
            name="familyRank"
            onChange={(e) =>
              setData({ ...data, familyRank: parseInt(e.target.value) })
            }
            value={data.familyRank ? data.familyRank.toString() : "1"}
          >
            <option value="1">Ray</option>
            <option value="2">Reny</option>
            <option value="3">Zanaka</option>
            <option value="4">Hafa</option>
          </select>
        </Container>

        <Container title="Sampana">
          <SelectMultiple
            options={SAMPANA}
            onChange={(val) => setData({ ...data, sampana: val })}
            defaultValue={data.sampana}
          />
        </Container>

        <Container title="Fanamarihana" childClass="!grid-cols-1">
          <textarea
            name="Hafa"
            id=""
            className="border px-2 rounded-[5px] text-grey h-[10vh] outline-none w-full"
            placeholder="fanamarihana manokana"
            value={data.other ? data.other : ""}
            onChange={onChangeHandler}
          ></textarea>
        </Container>

        <div className="text-right mt-4">
          <Button
            className="text-white bg-primary w-1/3 sm:w-1/4 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={id ? JSON.stringify(raw) === JSON.stringify(data) : false}
          >
            save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewMember;
