import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, useState } from "react";
import toast from "react-hot-toast";

const Import: FC = () => {
  const [filename, setFilename] = useState("");
  const [data, setData] = useState(new FormData());
  const [action, setAction] = useState("insert");
  const [load, setLoad] = useState(false);
  const chargeFile = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.accept = ".csv, .json";
    input.click();
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      setFilename(file.name);
      data.set("file", file);
    };
  };

  const handler = () => {
    setLoad(true);
    data.set("action", action);
    api
      .post("/member/import", data)
      .then((res) => {
        toast.success("Importation avec success");
        setData(new FormData());
      })
      .catch(() => {
        toast.error("Une erreur se produit pendant l'operarion");
      })
      .finally(() => {
        setLoad(false);
      });
  };
  return (
    <div className="h-full overflow-y-auto bg-white p-4">
      <div className="p-4 border-2 border-dashed rounded">
        <div className="flex justify-between items-center">
          <p className="text-slate-600 text-lg font-medium">Chretien</p>
          <div className="flex gap-2">
            <select
              className="border p-1 px-2 rounded"
              onChange={(e) => {
                setAction(e.target.value);
              }}
            >
              <option value="insert">Insertion</option>
              <option value="update">Mise à jour</option>
            </select>
            <button
              className="p-1 px-2 bg-primary text-white rounded flex gap-2 items-center"
              onClick={() => handler()}
            >
              <FontAwesomeIcon icon={solid("file-upload")} className="" />
              Importer
            </button>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center p-6 mt-4 cursor-pointer"
          onClick={() => chargeFile()}
        >
          <FontAwesomeIcon
            icon={load ? solid("circle-notch") : solid("file-arrow-up")}
            size="2x"
            className={`text-slate-400 ${load ? "animate-spin" : ""}`}
          />
          <p className="mt-2">{filename}</p>
        </div>
      </div>
    </div>
  );
};

export default Import;
