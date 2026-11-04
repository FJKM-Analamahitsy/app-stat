import InputNew from "@components/InputNew";
import Select from "@components/Select";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APK_FILE } from "@utils/constant";
import { FC } from "react";

const Setting: FC = () => {
  return (
    <div className="p-4 h-full bg-white flex flex-col gap-6">
      <h3 className=" text-xl">Paramètre</h3>
      <InputNew
        label="server d'imprimante"
        defaultValue={localStorage.getItem("xpserver") || "localhost"}
        onChange={(e) => {
          localStorage.setItem("xpserver", e.target.value);
        }}
      />
      <InputNew
        label="address d'imprimante"
        defaultValue={localStorage.getItem("xprinter") || "192.168.123.100"}
        onChange={(e) => {
          localStorage.setItem("xprinter", e.target.value);
        }}
      />
      <InputNew
        label="nombre copy par defaut"
        defaultValue={localStorage.getItem("ncopy") || "2"}
        onChange={(e) => {
          localStorage.setItem("ncopy", e.target.value);
        }}
      />
      <Select
        defaultValue={localStorage.getItem("xptype") || "third-party"}
        onChange={(e) => {
          localStorage.setItem("xptype", e.target.value);
        }}
        options={["third-party", "native"]}
        label="type d'imprimante"
        valueIndex={false}
      />
      <Select
        defaultValue={localStorage.getItem("culte") || "1"}
        onChange={(e) => {
          localStorage.setItem("culte", e.target.value);
        }}
        options={["1", "2"]}
        label="Culte"
        valueIndex={false}
      />

      <div>
        <p className="font-medium text-slate-800 mb-3">Fichier apk</p>
        <div className="flex flex-col gap-3">
          {APK_FILE.map((apk, i) => {
            return (
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={solid("tag")} />
                <a key={i} href={`apk/${apk}-release.apk`} download>
                  {apk}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Setting;
