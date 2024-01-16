import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Layout from "layout";
import { FC, ReactNode } from "react";

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
  return (
    <Layout>
      <div className="px-[2rem] py-[3rem] flex flex-col gap-4">
        <Container title="General">
          <InputNew label="Anarana" />
          <InputNew label="Fanampiny" />
          <div className="grid grid-cols-3">
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Lehilahy
              </label>
            </div>
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Vehivavy
              </label>
            </div>

            <input
              type="date"
              name=""
              id=""
              className="border px-2 rounded-[5px] text-grey"
            />
          </div>
          <InputNew label="Toerana nahaterahana" />
        </Container>

        <Container title="Batisa">
          <div className="grid grid-cols-3">
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Eny
              </label>
            </div>
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Tsy
              </label>
            </div>
          </div>
          <InputNew label="Taona" type="number" min={1800} max={2050} />
        </Container>

        <Container title="Mpandray">
          <div className="grid grid-cols-3">
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Eny
              </label>
            </div>
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Tsy
              </label>
            </div>
            <InputNew label="Andiany" />
          </div>
          <InputNew label="N° Karatra" />
        </Container>

        <Container title="Adress">
          <InputNew label="Home" />
          <InputNew label="Tanana" />
          <select
            name=""
            id=""
            className="border px-2 rounded-[5px] text-grey h-[40px] outline-none"
          >
            <option value="" defaultChecked>
              Faritra
            </option>
            <option value="">Atsimo</option>
            <option value="">Avaratra</option>
            <option value="">Atsinanana</option>
            <option value="">Andrefana</option>
          </select>
        </Container>

        <Container title="Asa">
          <div className="grid grid-cols-3">
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Tena
              </label>
            </div>
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Tsy miankina
              </label>
            </div>
            <div className="flex items-center gap-2 ">
              <input type="radio" name="gender" id="" />
              <label htmlFor="" className="text-[15px] text-grey">
                Fanjakana
              </label>
            </div>
          </div>
          <InputNew label="Talenta" />
        </Container>

        <Container title="Contact">
          <InputNew label="Telephone" />
          <InputNew label="Mail" />
          <InputNew label="facebook" />
        </Container>

        <Container title="Hobby">
          <InputNew label="Fialamboly" />
          <InputNew label="Fanatanjahatena" />
        </Container>

        <Container title="Other" childClass="!grid-cols-1">
          <textarea
            name=""
            id=""
            className="border px-2 rounded-[5px] text-grey h-[10vh] outline-none w-full"
            placeholder="fanamarihana manokana"
          ></textarea>
        </Container>

        <div className="text-right mt-4">
          <Button className="text-white bg-primary w-1/3 sm:w-1/4">save</Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewMember;
