import Button from "@components/Button";
import InputNew from "@components/InputNew";
import MounthPicker from "@components/MounthPicker";
import Select from "@components/Select";
import api, { getData } from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { preload } from "swr";
import useSWR from "swr/immutable";

interface Props {
  mpandray: string;
  success: () => void;
}

preload("/adidy/type", getData);

const Adidy: FC<Props> = ({ mpandray, success }) => {
  const now = useState(new Date())[0];
  const [data, setData] = useState<any>();

  const [disabled, setDisabled] = useState(false);

  const [monthEnd, setMonthhEnd] = useState(now.getMonth());
  const { data: types } = useSWR("/adidy/type", getData, { suspense: true });

  const submit = async () => {
    setDisabled(true);
    const month = [];
    for (let i = data.month; i <= monthEnd; i++) {
      month.push(i);
    }
    const compta = {
      type: data.type,
      mpandray,
      mtt: parseInt(data.pay.replace(/\./g, "")),
      month,
      year: data.year,
      culte: parseInt(localStorage.getItem("culte") as string),
    };
    const trace = {
      mpandray,
      year: data.year,
      month,
    };
    if (compta.mtt > 0) {
      const printer = {
        adress: localStorage.getItem("xprinter") || "192.168.123.100",
        port: 9100,
        copy: parseInt(localStorage.getItem("ncopy") || "2"),
      };
      const request = api
        .post("/adidy", { compta, trace, printer })
        .then(() => {
          success();
          setDisabled(false);
        });
      toast.promise(request, {
        success: "success",
        error: "error",
        loading: "En attente",
      });
    } else {
      toast.error("montant obligatoire");
    }
  };

  useEffect(() => {
    setData({
      ...data,
      mpandray,
      month: now.getMonth(),
      year: now.getFullYear(),
      pay: "",
      type: localStorage.getItem("type") ?? "",
    });
  }, [mpandray]);

  return (
    <>
      {data && (
        <div className="min-w-[50vw] text-[20px] py-[2rem] px-6 bg-white border border-bg m-4 mt-8 md:mx-auto  rounded-[5px] flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-3">
            <select
              className="p-2 rounded border border-slate-100 text-grey"
              value={data.type}
              onChange={(e) => {
                setData({ ...data, type: e.target.value });
                localStorage.setItem("type", e.target.value);
              }}
            >
              {types.map((t: any, i: number) => {
                return (
                  <option key={i} value={t._id}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <Select
              value={data.year}
              onChange={(e) =>
                setData({ ...data, year: parseInt(e.target.value) })
              }
              options={[
                ...Array.from(Array(10).keys()).map((i) =>
                  (now.getFullYear() + 3 - i).toString()
                ),
              ]}
              valueIndex={false}
            />
          </div>
          <MounthPicker />
          <InputNew
            label="Vola"
            value={data.pay}
            onChange={(e) => {
              let cval = e.target.value;
              const mtt = cval.replace(/\s|,|\./g, "");
              cval = new Intl.NumberFormat("de-FR").format(+mtt);
              setData({ ...data, pay: cval });
            }}
          />
          <div className="text-right mt-4">
            <Button
              className="text-white bg-primary w-full disabled:!cursor-not-allowed disabled:opacity-50"
              disabled={
                disabled ||
                data.pay === "" ||
                parseInt(data.pay.replace(/\./g, "")) <= 0
              }
              onClick={submit}
            >
              Payer
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Adidy;
