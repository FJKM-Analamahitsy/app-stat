import Button from "@components/Button";
import InputNew from "@components/InputNew";
import RadioButton from "@components/RadioButton";
import Select from "@components/Select";
import SelectMultiple from "@components/SelectMultiple";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { ANTOKO_DIAKONE, MONTHS, SAMPANA } from "@utils/constant";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
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
  const [data, setData] = useState<any>({ familyRank: 1, famHead: false });
  const navigate = useNavigate();
  const { id } = useParams();
  const container = useRef<HTMLDivElement>(null);

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
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          api
            .patch("/member/" + data._id, data)
            .then(() => navigate(`/christian/${id}`))
            .catch((err) => console.log(err));
        } else {
          api
            .post("/member", data)
            .then(() => {
              setData({ familyRank: 1, famHead: false });
              container.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              toast.success("données insérées");
            })
            .catch((err) => console.log(err));
        }
      }}
    >
      <div
        ref={container}
        className="px-[2rem] py-[3rem] flex flex-col gap-4 bg-white"
      >
        <Container title="Ny Tena">
          <InputNew
            label="Anarana"
            name="name"
            className="[&>input]:uppercase"
            required
            value={data.name ? data.name : ""}
            onChange={onChangeHandler}
          />
          <InputNew
            label="Fanampiny"
            name="forname"
            className="[&>input]:capitalize"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
            <RadioButton
              name="mpandray"
              value="hafa"
              onChange={onChangeHandler}
              checked={data.mpandray === "hafa"}
              onClick={() => setDataHandler("mpandray", "hafa")}
            />

            <InputNew
              label="Andiany"
              name="mpandrayAndiany"
              value={data.mpandrayAndiany ? data.mpandrayAndiany : ""}
              onChange={onChangeHandler}
              className="col-span-2 md:col-auto"
            />
          </div>
          <div>
            <InputNew
              label="N° Karatra"
              name="mpandrayN"
              value={data.mpandrayN ? data.mpandrayN : ""}
              onChange={onChangeHandler}
            />
          </div>
        </Container>

        <Container title="Ankohonana">
          <InputNew
            label="Numero"
            type="number"
            value={data.familyId ? data.familyId : ""}
            onChange={(e) => {
              setData({ ...data, familyId: +e.target.value });
            }}
          />
          <div className="flex gap-3">
            <input
              type="checkbox"
              className="w-5"
              name="famHead"
              checked={data.famHead}
              onChange={(e) => {
                setData({ ...data, famHead: e.target.checked });
              }}
            />
            <p className="mt-1 text-lg">Loha-mpianakaviana</p>
          </div>
          <select
            className="rounded border p-3 px-1"
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

        {data.famHead && (
          <Container title="Fonenana">
            <InputNew
              label="Trano"
              name="home"
              value={data.home ? data.home : ""}
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
            <InputNew
              label="Zone"
              name="zone"
              type="number"
              min={0}
              value={data.zone ?? ""}
              onChange={(e) => {
                setData({
                  ...data,
                  zone: +e.target.value,
                });
              }}
            />
          </Container>
        )}

        <Container title="Fifandraisana">
          <InputNew
            label="Telephone"
            name="phone"
            maxLength={10}
            placeholder=""
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

        <Container title="Sampana">
          <SelectMultiple
            options={SAMPANA}
            onChange={(val) => setData({ ...data, sampana: val })}
            defaultValue={data.sampana}
          />

          {data.sampana && /DIAKONA|FLD/.test(data.sampana) && (
            <>
              <Select
                label="Antoko diakona"
                options={["", ...ANTOKO_DIAKONE]}
                onChange={(e) => {
                  setData({ ...data, antoko: e.target.value });
                }}
                valueIndex={false}
              />
              <InputNew
                label="Tondro toerana - GPS"
                name="location"
                value={data.location ? data.location.coordinates.join(",") : ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    location: {
                      type: "Point",
                      coordinates: e.target.value
                        .split(",")
                        .map((v) => parseFloat(v)),
                    },
                  });
                }}
              />
              <InputNew
                label="Zone"
                name="zone"
                type="number"
                min={0}
                value={data.zone ?? ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    zone: +e.target.value,
                  });
                }}
              />
            </>
          )}
        </Container>

        <Container title="Fanamarihana" childClass="!grid-cols-1">
          <textarea
            name="other"
            className="border px-2 rounded-[5px] text-grey h-[10vh] outline-none w-full"
            placeholder="fanamarihana manokana"
            value={data.other ? data.other : ""}
            onChange={onChangeHandler}
          ></textarea>
        </Container>

        <div className="text-right mt-4">
          <Button
            className="text-white bg-primary w-full sm:w-1/4 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={id ? JSON.stringify(raw) === JSON.stringify(data) : false}
          >
            <FontAwesomeIcon icon={solid("save")} className="mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewMember;
