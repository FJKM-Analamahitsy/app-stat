import Button from "@components/Button";
import InputNew from "@components/InputNew";
import api from "@utils/api";
import Layout from "layout";
import { FC, ReactNode, useState } from "react";

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
  return (
    <Layout>
      <form
        onChange={(e: any) => {
          const value = e.target.value;
          const name = e.target.name;
          setData({ ...data, [name]: value });
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          await api
            .post("/member", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        <div className="px-[2rem] py-[3rem] flex flex-col gap-4">
          <Container title="General">
            <InputNew label="Anarana" name="name" required />
            <InputNew label="Fanampiny" name="forname" />
            <div className="grid grid-cols-3">
              <div className="flex items-center gap-2 ">
                <input type="radio" name="gender" value={1} />
                <label htmlFor="" className="text-[15px] text-grey">
                  Lehilahy
                </label>
              </div>
              <div className="flex items-center gap-2 ">
                <input type="radio" name="gender" value={0} />
                <label htmlFor="" className="text-[15px] text-grey">
                  Vehivavy
                </label>
              </div>

              <input
                type="date"
                name="brithdate"
                id=""
                className="border px-2 rounded-[5px] h-[40px] text-grey"
              />
            </div>
            <InputNew label="Toerana nahaterahana" name="birthplace" />
          </Container>

          <Container title="Batisa">
            <div className="grid grid-cols-3">
              <div className="flex items-center gap-2 ">
                <input type="radio" name="baptism" value="true" />
                <label htmlFor="" className="text-[15px] text-grey">
                  Eny
                </label>
              </div>
              <div className="flex items-center gap-2 ">
                <input type="radio" name="baptism" value="false" />
                <label htmlFor="" className="text-[15px] text-grey">
                  Tsy
                </label>
              </div>
            </div>
            <InputNew
              label="Taona"
              type="number"
              min={1800}
              max={2050}
              name="baptismYear"
            />
          </Container>

          <Container title="Mpandray">
            <div className="grid grid-cols-3">
              <div className="flex items-center gap-2 ">
                <input type="radio" name="mpandray" value="true" />
                <label htmlFor="" className="text-[15px] text-grey">
                  Eny
                </label>
              </div>
              <div className="flex items-center gap-2 ">
                <input type="radio" name="mpandray" value="false" />
                <label htmlFor="" className="text-[15px] text-grey">
                  Tsy
                </label>
              </div>
              <InputNew label="Andiany" name="mpandrayAndiany" />
            </div>
            <InputNew label="N° Karatra" name="mpandrayN" />
          </Container>

          <Container title="Adress">
            <InputNew label="Home" name="home" />
            <InputNew label="Tanana" name="city" />
            <select
              name="faritra"
              id=""
              className="border px-2 rounded-[5px] text-grey h-[40px] outline-none"
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
              <div className="flex items-center gap-2 ">
                <input type="radio" name="job" value={0} />
                <label htmlFor="" className="text-[15px] text-grey">
                  Tena
                </label>
              </div>
              <div className="flex items-center gap-2 ">
                <input type="radio" name="job" value={1} />
                <label htmlFor="" className="text-[15px] text-grey">
                  Tsy miankina
                </label>
              </div>
              <div className="flex items-center gap-2 ">
                <input type="radio" name="job" value={2} />
                <label htmlFor="" className="text-[15px] text-grey">
                  Fanjakana
                </label>
              </div>
            </div>
            <InputNew label="Talenta" name="talent" />
          </Container>

          <Container title="Contact">
            <InputNew label="Telephone" name="phone" />
            <InputNew label="Mail" name="mail" />
            <InputNew label="facebook" name="fb" />
          </Container>

          <Container title="Hobby">
            <InputNew label="Fialamboly" name="hobby" />
            <InputNew label="Fanatanjahatena" name="sport" />
          </Container>

          <Container title="Other" childClass="!grid-cols-1">
            <textarea
              name="other"
              id=""
              className="border px-2 rounded-[5px] text-grey h-[10vh] outline-none w-full"
              placeholder="fanamarihana manokana"
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
