import InputNew from "@components/InputNew";
import Select from "@components/Select";
import Layout from "layout/Layout";
import { FC } from "react";

const Adidy: FC = () => {
  return (
    <Layout>
      <div className="max-w-[600px] p-4 border border-bg m-auto mt-4 rounded-[5px]">
        <InputNew />
        <Select options={["adidy mpandray", "adidy iombonana", "vokadehibe"]} />
      </div>
    </Layout>
  );
};

export default Adidy;
