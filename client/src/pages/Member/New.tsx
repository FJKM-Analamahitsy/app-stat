import InputNew from "@components/InputNew";
import Layout from "layout";
import { FC } from "react";

const NewMember: FC = () => {
  return (
    <Layout>
      <div className="border border-bg rounded-[5px]">
        <h2>General</h2>
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <InputNew label="birth place" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewMember;
