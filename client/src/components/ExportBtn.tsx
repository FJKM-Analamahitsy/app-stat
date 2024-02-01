import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import Button from "./Button";
import { fields } from "@utils/constant";
import api from "@utils/api";

const ExportBtn: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<string[]>([]);
  const close = () => {
    setShow(false);
    setFilter([]);
  };
  return (
    <>
      <div
        className="bg-primary text-white p-1 px-8 rounded-[5px] w-fit float-right cursor-pointer"
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={solid("file-arrow-down")} />
        <span className="ml-2">Export</span>
      </div>
      {show && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-[5px] p-4 w-[300px]">
            <h3 className="text-lg font-medium">Export</h3>
            <div className="my-4 h-[300px] overflow-auto">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                  filter.length < fields.length
                    ? setFilter([...fields.map((el) => el.value)])
                    : setFilter([]);
                }}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="cursor-pointer"
                  checked={filter.length === fields.length}
                />
                <label className="capitalize cursor-pointer">All</label>
              </div>
              {fields.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4"
                    onClick={() => {
                      filter.indexOf(el.value) !== -1
                        ? setFilter(filter.filter((vl) => vl !== el.value))
                        : setFilter([...filter, el.value]);
                    }}
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={filter.includes(el.value)}
                      className="cursor-pointer"
                    />
                    <label className="capitalize cursor-pointer">
                      {el.label}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <Button
                className="bg-slate-400 text-white p-[1px]"
                onClick={close}
              >
                cancel
              </Button>
              <a
                href={`${
                  api.defaults.baseURL
                }/member/export?filter=${filter.join("|")}`}
                onClick={close}
              >
                <Button className="bg-primary text-white">export</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportBtn;
