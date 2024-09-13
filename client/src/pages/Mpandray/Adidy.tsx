import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Select from "@components/Select";
import SelectMember from "@components/SelectMember";
import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useState } from "react";
import toast from "react-hot-toast";

const Adidy: FC = () => {
  const now = useState(new Date())[0];
  const [data, setData] = useState({
    mpandray: "",
    month: now.getMonth(),
    year: now.getFullYear(),
    pay: 0,
    type: "adidy mpandray",
  });
  const [monthEnd, setMonthhEnd] = useState(now.getMonth());
  const submit = () => {
    if (data.mpandray !== "" && data.pay !== 0) {
      const n = data.type === "adidy mpandray" ? monthEnd - data.month + 1 : 1;
      let i = 0;
      const pay = n > 1 ? +(data.pay / n).toFixed(2) : data.pay;
      do {
        const topay = { ...data, pay, month: data.month + i };
        api
          .post("/adidy", topay)
          .then((res) => {
            if (i === n) {
              setData({
                mpandray: "",
                month: now.getMonth(),
                year: now.getFullYear(),
                pay: 0,
                type: "adidy mpandray",
              });
              toast.success("Operation reussi, Merci!");
            }
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        i++;
      } while (i < n);
    }
  };
  return (
    <div className="max-w-[500px] py-[2rem] px-4 bg-white border border-bg m-4 mt-8 md:mx-auto  rounded-[5px] flex flex-col gap-8">
      <SelectMember
        label="Mpandray"
        onSelected={(m) => setData({ ...data, mpandray: m._id })}
      />
      <Select
        value={data.type}
        onChange={(e) => setData({ ...data, type: e.target.value })}
        options={["adidy mpandray", "adidy iombonana", "voka-dehibe"]}
        valueIndex={false}
      />
      <div className="grid grid-cols-3 gap-4">
        <Select
          value={data.month}
          options={[...MONTHS]}
          onChange={(e) => {
            setData({ ...data, month: +e.target.value });
            setMonthhEnd(+e.target.value);
          }}
        />
        <Select
          value={monthEnd}
          options={[...MONTHS]}
          onChange={(e) => {
            setMonthhEnd(Math.max(data.month, +e.target.value));
          }}
        />
        <Select
          value={data.year}
          onChange={(e) => setData({ ...data, year: parseInt(e.target.value) })}
          options={[
            ...Array.from(Array(4).keys()).map((i) =>
              (now.getFullYear() + 1 - i).toString()
            ),
          ]}
          valueIndex={false}
        />
      </div>
      <InputNew
        type="number"
        label="Vola"
        value={data.pay}
        onChange={(e) => setData({ ...data, pay: parseInt(e.target.value) })}
      />
      <div className="text-right mt-4">
        <Button className="text-white bg-primary w-full" onClick={submit}>
          pay
        </Button>
      </div>
    </div>
  );
};

export default Adidy;
