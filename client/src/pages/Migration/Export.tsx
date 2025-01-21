import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { fields, MONTHS, SAMPANA } from "@utils/constant";
import dayjs from "dayjs";
import { FC, useRef, useState } from "react";

const Export: FC = () => {
  const [filter, setFilter] = useState<any>({});
  const [field, setField] = useState<string[]>([]);
  const modal = useRef<any>(null);
  const [fileType, setFiletype] = useState("csv");

  const exportHandler = () => {
    const data = { filter, field, fileType };
    api.post("/member/export", data).then((res) => {
      const Type = fileType === "csv" ? "text/csv" : "application/json";
      const raw =
        fileType === "csv" ? res.data : JSON.stringify(res.data, null, 2);
      const blob = new Blob([raw], { type: Type });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Liste_Export_${dayjs().format(
        "DD_MM_YYYY_HH_mm"
      )}.${fileType}`;
      link.click();
    });
  };
  return (
    <div className="bg-white h-full p-6">
      <div className="border rounded p-5 mb-6">
        <p className="text-lg mb-3">Filtre</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="my-2">Mpandray</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.mpandray ? "bg-primary text-white" : ""
              }`}
              value={filter.mpandray}
              onChange={(e) => {
                setFilter({ ...filter, mpandray: e.target.value });
              }}
            >
              <option value="">Tous</option>
              <option value="eny">Eny</option>
              <option value="tsia">Tsia</option>
            </select>
          </div>

          <div>
            <p className="my-2">Batisa</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.baptism ? "bg-primary text-white" : ""
              }`}
              value={filter.baptism}
              onChange={(e) => {
                setFilter({ ...filter, baptism: e.target.value });
              }}
            >
              <option value="">Tous</option>
              <option value="eny">Eny</option>
              <option value="tsia">Tsia</option>
            </select>
          </div>

          <div>
            <p className="my-2">Faritra</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.place ? "bg-primary text-white" : ""
              }`}
              value={filter.place}
              onChange={(e) => {
                setFilter({ ...filter, place: e.target.value });
              }}
            >
              <option value="">Tous</option>
              <option value="atsimo">Atsimo</option>
              <option value="andrefana">Andrefana</option>
              <option value="atsinanana">Atsinanana</option>
              <option value="avaratra">Avaratra</option>
            </select>
          </div>

          <div>
            <p className="my-2">L/V</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.gender ? "bg-primary text-white" : ""
              }`}
              value={filter.gender}
              onChange={(e) => {
                setFilter({ ...filter, gender: e.target.value });
              }}
            >
              <option value="">Tous</option>
              <option value="lehilahy">Lehilahy</option>
              <option value="vehivavy">Vehivavy</option>
            </select>
          </div>

          <div>
            <p className="my-2">Volana nahaterahana</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.birthday ? "bg-primary text-white" : ""
              }`}
              value={filter.birthday}
              onChange={(e) => {
                setFilter({ ...filter, birthday: e.target.value });
              }}
            >
              <option value="">Tous</option>
              {MONTHS.sort().map((s) => {
                return <option value={s}>{s}</option>;
              })}
            </select>
          </div>

          <div>
            <p className="my-2">Statut</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.status ? "bg-primary text-white" : ""
              }`}
              value={filter.status}
              onChange={(e) => {
                setFilter({ ...filter, status: e.target.value === "true" });
              }}
            >
              <option value="">Tous</option>
              <option value="true">Activer</option>
              <option value="false">Desactiver</option>
            </select>
          </div>
          <div>
            <p className="my-2">Sampana</p>
            <select
              className={`bg-bg w-full p-3 px-1 rounded duration-200 ${
                filter.sampana ? "bg-primary text-white" : ""
              }`}
              value={filter.sampana}
              onChange={(e) => {
                setFilter({ ...filter, sampana: e.target.value });
              }}
            >
              <option value="">Tous</option>
              {SAMPANA.sort().map((s) => {
                return <option value={s}>{s}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="border rounded p-5">
        <p className="text-lg mb-3">Entête du liste</p>
        <div className="flex flex-wrap md:grid md:grid-cols-4 gap-4">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              field.length < fields.length
                ? setField([...fields.map((el) => el.value)])
                : setField([]);
            }}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={field.length === fields.length}
            />
            <label className="capitalize cursor-pointer">All</label>
          </div>
          {fields.map((el, i) => {
            return (
              <div
                key={i}
                className="flex items-center gap-4"
                onClick={() => {
                  field.indexOf(el.value) !== -1
                    ? setField(field.filter((vl) => vl !== el.value))
                    : setField([...field, el.value]);
                }}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={field.includes(el.value)}
                  className="cursor-pointer"
                />
                <label className="capitalize cursor-pointer">{el.label}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Modal ref={modal}>
          <button className="bg-primary text-white p-2 px-8 rounded">
            Suivant
          </button>
          <div className="p-4 rounded-md min-w-[400px] w-full bg-white">
            <p className="text-lg">Export</p>
            <p></p>
            <div className="my-5 flex gap-5">
              <p
                className={`border p-2 w-28 text-center rounded font-semibold ring-2 ring-slate-300 text-slate-500 cursor-pointer ${
                  fileType === "csv" ? "!ring-primary" : ""
                }`}
                onClick={() => {
                  setFiletype("csv");
                }}
              >
                csv
              </p>
              <p
                className={`border p-2 w-28 text-center rounded font-semibold ring-2 ring-slate-300 text-slate-500 cursor-pointer ${
                  fileType === "json" ? "!ring-primary" : ""
                }`}
                onClick={() => setFiletype("json")}
              >
                json
              </p>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                className="p-2 px-4 border rounded"
                onClick={() => modal.current.close()}
              >
                annuler
              </button>
              <button
                className="p-2 px-4 bg-primary text-white rounded"
                onClick={() => exportHandler()}
              >
                <FontAwesomeIcon
                  icon={solid("download")}
                  size="sm"
                  className="mr-2"
                />{" "}
                exporter
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Export;
