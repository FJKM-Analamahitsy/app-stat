import InputNew from "@components/InputNew";
import Select from "@components/Select";
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
    </div>
  );
};

export default Setting;
