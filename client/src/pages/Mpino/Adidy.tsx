import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Select from "@components/Select";
import Print from "@containers/Print";
import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  mpandray: string;
  success: () => void;
}

const Adidy: FC<Props> = ({ mpandray, success }) => {
  const now = useState(new Date())[0];
  const [data, setData] = useState({
    mpandray,
    month: now.getMonth(),
    year: now.getFullYear(),
    pay: "",
    type: "",
  });
  const [pData, setPdata] = useState<any>();
  const printButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const [monthEnd, setMonthhEnd] = useState(now.getMonth());
  const [types, setTypes] = useState([]);
  const submit = async () => {
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
    };
    const trace = {
      mpandray,
      year: data.year,
      month,
    };
    const request = api.post("/adidy", { compta, trace }).then((res) => {
      setPdata(res.data);
    });
    toast.promise(request, {
      loading: "En attente...",
      success: "Pré a imprimer",
      error: "Une erreur se produit.",
    });
  };

  useEffect(() => {
    if (pData) {
      if (isMobile) {
        sessionStorage.setItem("prev", "/christian/" + mpandray);
        navigate("/print/" + pData._id);
      } else {
        printButton.current?.click();
      }
      success();
    }
  }, [pData]);

  useEffect(
    () => {
      api.get("/adidy/type").then((res) => {
        setData({ ...data, type: res.data[0]._id });
        setTypes(res.data);
      });
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className="min-w-[50vw] text-[20px] py-[2rem] px-6 bg-white border border-bg m-4 mt-8 md:mx-auto  rounded-[5px] flex flex-col gap-8">
      <select
        className="p-1 px-1 rounded border text-grey"
        value={data.type}
        onChange={(e) => setData({ ...data, type: e.target.value })}
      >
        {types.map((t: any, i: number) => {
          return (
            <option key={i} value={t._id}>
              {t.name}
            </option>
          );
        })}
      </select>
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
        <Button className="text-white bg-primary w-full" onClick={submit}>
          Payer
        </Button>
      </div>
      {pData && (
        <div className="hidden">
          <Print data={pData} onsuccess={success}>
            <button ref={printButton}></button>
          </Print>
        </div>
      )}
    </div>
  );
};

export default Adidy;
