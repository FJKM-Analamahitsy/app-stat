import api from "@utils/api";
import { FC, useEffect, useState } from "react";
import Avatar from "./Avatar";
import InputNew from "./InputNew";

interface SelectMemberProps {
  label?: string;
  onSelected: (member: any) => void;
  defaultValue?: string;
}

const SelectMember: FC<SelectMemberProps> = ({
  label,
  onSelected,
  defaultValue = "",
}) => {
  const [result, setResult] = useState<any>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  const searchHandler = (e: any) => {
    setValue(e.target.value);
    api
      .get("/member/search?q=" + e.target.value)
      .then((res) => setResult(res.data));
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className="relative">
      <InputNew
        value={value}
        label={label}
        onChange={searchHandler}
        onFocus={() => setFocus(true)}
      />
      {focus && result.length > 0 && (
        <div className="absolute bg-white w-full shadow-md rounded-[5px] border border-bg mt-2 z-50">
          {result.map((el: any, i: number) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 px-4 hover:bg-bg"
                onClick={() => {
                  setValue(el.name + " " + el.forname);
                  setFocus(false);
                  onSelected(el);
                }}
              >
                <Avatar label={el.name + " " + el.forname} />
                <p>{el.mpandrayN}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectMember;
