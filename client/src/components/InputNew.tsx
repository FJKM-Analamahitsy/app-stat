import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, useState } from "react";

interface InputNewProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const InputNew: FC<InputNewProps> = ({ label, className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [timer, setTtimer] = useState<any>();

  const check = (val: string) => {
    if (val.trim() !== "") {
      setStatus("");
      setLoading(true);
      clearTimeout(timer);
      setTtimer(
        setTimeout(() => {
          api.get(`/member/check/${val}`).then((res) => {
            setStatus(res.data ? "exist" : "avail");
            setLoading(false);
          });
        }, 500)
      );
    } else {
      setStatus("");
      setLoading(false);
    }
  };
  return (
    <div className={`relative  bg-white ${className}`}>
      <input
        type="text"
        id={props.id}
        className="relative text-grey z-10 peer bg-transparent h-10 w-full rounded-[5px]  placeholder-transparent ring-1 px-2 ring-gray-200 focus:ring-2 focus:ring-sky-200 focus:outline-none "
        placeholder="Type inside me"
        onKeyUp={(e: any) =>
          props.name === "mpandrayN" && check(e.target.value)
        }
        {...props}
      />
      {props.name === "mpandrayN" && (
        <div className="absolute right-2 top-0 h-full flex items-center">
          {loading && (
            <FontAwesomeIcon
              icon={solid("circle-notch")}
              className="animate-spin"
            />
          )}
          {status === "avail" && (
            <FontAwesomeIcon icon={solid("check")} className="text-green-600" />
          )}

          {status === "exist" && (
            <FontAwesomeIcon
              icon={solid("warning")}
              className="text-orange-400"
            />
          )}
        </div>
      )}
      <label
        htmlFor={props.id}
        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-placeholder-shown:z-0 peer-focus:z-20 z-20 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
      >
        {label}
      </label>
    </div>
  );
};

export default InputNew;
