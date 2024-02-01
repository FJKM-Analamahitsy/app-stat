import Calendar from "@components/Calendar";
import Layout from "layout";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Layout>
      <div className="bg-slate-50 h-full p-2">
        <Calendar />
      </div>
    </Layout>
  );
};

export default Home;
