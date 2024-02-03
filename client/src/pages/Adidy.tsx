import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Select from "@components/Select";
import Layout from "layout/Layout";
import { FC, useState } from "react";

const Adidy: FC = () => {
  const now = useState(new Date())[0];
  const month = useState([
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre",
  ])[0];
  return (
    <Layout>
      <div className="max-w-[500px] py-[2rem] px-4 border border-bg m-4 md:m-auto mt-4 rounded-[5px] flex flex-col gap-8">
        <InputNew />
        <Select
          options={["adidy mpandray", "adidy iombonana", "voka-dehibe"]}
        />
        <div className="grid grid-cols-3 gap-4">
          <Select defaultValue={3} options={[...month]} />
          <Select
            defaultValue={1}
            options={[
              ...Array.from(Array(12).keys()).map((i) => (i + 1).toString()),
            ]}
          />
          <Select
            options={[
              ...Array.from(Array(3).keys()).map((i) =>
                (now.getFullYear() - i).toString()
              ),
            ]}
          />
        </div>
        <InputNew type="number" label="Vola" />
        <div className="text-right mt-4">
          <Button className="text-white bg-primary w-1/3 sm:w-1/4">
            payer
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Adidy;
