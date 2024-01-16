import { FC } from "react";

interface InputNewProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const InputNew: FC<InputNewProps> = ({ label, ...props }) => {
  return (
    <div className="relative bg-inherit bg-white ">
      <input
        type="text"
        id="username"
        name="username"
        className="peer bg-transparent h-10 w-full rounded-[5px] text-gray-200 placeholder-transparent ring-[2px] px-2 ring-gray-200 focus:ring-sky-200 focus:outline-none focus:border-rose-600"
        placeholder="Type inside me"
        {...props}
      />
      <label
        htmlFor="username"
        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
      >
        {label}
      </label>
    </div>
  );
};

export default InputNew;
