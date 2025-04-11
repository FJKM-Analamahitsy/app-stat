import Button from "@components/Button";
import InputNew from "@components/InputNew";
import Modal from "@components/Modal";
import MounthPicker from "@components/MounthPicker";
import Select from "@components/Select";
import api, { getData } from "@utils/api";
import { FC, FormEvent, ReactNode, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { mutate, preload } from "swr";
import useSWR from "swr/immutable";

interface Props {
  children: ReactNode;
  mpandray: string;
  success: () => void;
}

preload("/adidy/type", getData);

const Adidy: FC<Props> = ({ mpandray, success, children }) => {
  const now = useMemo(() => new Date(), []);
  const [data, setData] = useState<any>();
  const modal = useRef<any>(null);
  const [disabled, setDisabled] = useState(false);
  const { data: types } = useSWR("/adidy/type", getData, { suspense: true });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    const compta = {
      type: data.type,
      mpandray,
      mtt: parseInt(data.pay.replace(/\./g, "")),
      month: data.month,
      year: data.year,
      culte: parseInt(localStorage.getItem("culte") as string),
    };

    if (compta.mtt > 0) {
      const printer = {
        adress: localStorage.getItem("xprinter") || "192.168.123.100",
        port: 9100,
        copy: parseInt(localStorage.getItem("ncopy") || "2"),
      };
      const request = api
        .post("/adidy", { compta, printer })
        .then(() => {
          success();
          mutate("/adidy/trace/" + mpandray);
          modal.current.close();
        })
        .finally(() => {
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

  return (
    <Modal ref={modal}>
      <div
        onClick={() => {
          setData({
            month: [now.getMonth()],
            year: now.getFullYear(),
            pay: "",
            type: localStorage.getItem("type") ?? "",
          });
        }}
      >
        {children}
      </div>
      <div>
        {data && (
          <form
            onSubmit={submit}
            className="min-w-[80vw] lg:min-w-[50vw] text-xl lg:text-lg py-[2rem] px-6 bg-white border border-bg m-4 mt-8 md:mx-auto  rounded-[5px] flex flex-col gap-8"
          >
            <div className="grid grid-cols-2 gap-3">
              <select
                className="p-3 lg:p-2 rounded border border-slate-100 text-grey"
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
            <MounthPicker
              onChange={(month) => {
                setData({ ...data, month });
              }}
            />
            <InputNew
              label="Vola"
              value={data.pay}
              onChange={(e) => {
                let cval = e.target.value.replace(/\D/g, "");
                if (/^\d*([.,]?\d*)$/.test(cval)) {
                  const mtt = cval.replace(/\s|,|\./g, "");
                  cval = new Intl.NumberFormat("de-FR").format(+mtt);
                  setData({ ...data, pay: cval });
                }
              }}
            />
            <div className="flex mt-4 gap-4">
              <Button
                type="button"
                className="bg-slate-100 px-8"
                onClick={() => modal.current.close()}
              >
                Annuler
              </Button>
              <Button
                className="text-white bg-primary w-full disabled:!cursor-not-allowed disabled:opacity-50"
                disabled={
                  disabled ||
                  data.pay === "" ||
                  parseInt(data.pay.replace(/\./g, "")) <= 0
                }
              >
                Payer
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default Adidy;
