import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Select from "@components/Select";
import SelectMember from "@components/SelectMember";
import api from "@utils/api";
import Layout from "layout/Layout";
import { FC, useState } from "react";
import toast from "react-hot-toast";

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
  const [data, setData] = useState({
    mpandray: "",
    month: now.getMonth(),
    year: now.getFullYear(),
    pay: 0,
    type: "adidy mpandray",
  });
  const submit = () => {
    if (data.mpandray !== "" && data.pay !== 0) {
      api
        .post("/adidy", data)
        .then((res) => {
          setData({
            mpandray: "",
            month: now.getMonth(),
            year: now.getFullYear(),
            pay: 0,
            type: "adidy mpandray",
          });
          toast.success("Operation reussi, Merci!");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };
  return (
    <Layout>
      <div className="max-w-[500px] py-[2rem] px-4 border border-bg m-4 mt-8 md:mx-auto  rounded-[5px] flex flex-col gap-8">
        <SelectMember
          label="Mpandray"
          onSelected={(m) => setData({ ...data, mpandray: m._id })}
        />
        <Select
          defaultValue={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          options={["adidy mpandray", "adidy iombonana", "voka-dehibe"]}
        />
        <div className="grid grid-cols-3 gap-4">
          <Select
            defaultValue={data.month}
            options={[...month]}
            onChange={(e) =>
              setData({ ...data, month: month.indexOf(e.target.value) })
            }
          />
          <Select
            defaultValue={1}
            options={[
              ...Array.from(Array(12).keys()).map((i) => (i + 1).toString()),
            ]}
          />
          <Select
            defaultValue={data.year}
            onChange={(e) =>
              setData({ ...data, year: parseInt(e.target.value) })
            }
            options={[
              ...Array.from(Array(3).keys()).map((i) =>
                (now.getFullYear() - i).toString()
              ),
            ]}
          />
        </div>
        <InputNew
          type="number"
          label="Vola"
          value={data.pay}
          onChange={(e) => setData({ ...data, pay: parseInt(e.target.value) })}
        />
        <div className="text-right mt-4">
          <Button
            className="text-white bg-primary w-1/3 sm:w-1/4"
            onClick={submit}
          >
            payer
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Adidy;
