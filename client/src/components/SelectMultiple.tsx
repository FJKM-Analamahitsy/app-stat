import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  options: string[];
  onChange: (val: string) => void;
  defaultValue?: string;
}

const SelectMultiple: FC<Props> = ({ options, onChange, defaultValue }) => {
  const container = useRef<HTMLDivElement>(null);
  const [opts, setOpts] = useState(options);
  const [values, setValues] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

  const setValuesHandler = (val: string) => {
    if (values?.indexOf(val) === -1) {
      setValues([...values, val]);
    } else {
      removeValues(val);
    }
  };

  const removeValues = (val: string) => {
    setValues(values?.filter((v) => v !== val));
  };

  const onclickoutside = (e: any) => {
    setFocus(container.current?.contains(e.target) || false);
  };

  useEffect(
    () => {
      onChange(values.join(" "));
    }, // eslint-disable-next-line
    [values]
  );

  useEffect(() => {
    if (defaultValue && defaultValue?.trim() !== "") {
      setValues(defaultValue?.split(" "));
    }
  }, [defaultValue]);

  window.addEventListener("click", onclickoutside);

  return (
    <div className="border rounded p-2 relative flex gap-2" ref={container}>
      {values?.map((v, i) => {
        return (
          <div
            key={i}
            className="bg-bg rounded-full p-1 px-2 flex gap-2 items-center"
          >
            {v}
            <FontAwesomeIcon
              icon={solid("close")}
              className="cursor-pointer text-sm"
              onClick={() => removeValues(v)}
            />
          </div>
        );
      })}
      <input
        type="text"
        className="bg-transparent grow"
        placeholder="search"
        onChange={(e) => {
          setOpts(
            options.filter((v) =>
              v.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
      {focus && (
        <div className="w-full absolute top-full left-0 max-h-[200px] overflow-y-auto shadow border bg-white">
          {opts.map((opt, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setValuesHandler(opt);
                }}
                className={`p-3 hover:bg-bg ${
                  values.indexOf(opt) !== -1 ? "bg-bg" : ""
                }`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectMultiple;
