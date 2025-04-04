import api from "@utils/api";
import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Avatar from "./Avatar";
import InputNew from "./InputNew";

interface SelectMemberProps {
  label?: string;
  onSelected: (member: any) => void;
  defaultValue?: string;
}

const SelectMember = forwardRef<any, SelectMemberProps>(
  ({ label, onSelected, defaultValue = "" }, ref) => {
    const [result, setResult] = useState<any>([]);
    const [focus, setFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue);
    const [timer, setTimer] = useState<any>();
    const container = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      reset() {
        setValue("");
      },
    }));

    const onclickoutside = (e: any) => {
      setFocus(container.current?.contains(e.target) || false);
    };

    const searchHandler = (e: any) => {
      setValue(e.target.value);
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          api
            .get("/member/search?q=" + e.target.value)
            .then((res) => setResult(res.data));
        }, 500)
      );
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);
    window.addEventListener("click", onclickoutside);
    return (
      <div ref={container} className="relative">
        <InputNew
          value={value}
          label={label}
          onChange={searchHandler}
          onFocus={() => setFocus(true)}
        />
        {focus && result.length > 0 && (
          <div className="absolute bg-white w-full shadow-md rounded-[5px] border border-bg mt-2 z-50 max-h-[300px] overflow-y-auto">
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
  }
);

export default SelectMember;
