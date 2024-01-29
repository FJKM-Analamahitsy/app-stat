import { FC } from "react";

interface InputNewProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const InputNew: FC<InputNewProps> = ({ label, className, ...props }) => {
  return (
    <div className={`relative  bg-white ${className}`}>
      <input
        type="text"
        id={props.id}
        className="relative text-grey z-10 peer bg-transparent h-10 w-full rounded-[5px]  placeholder-transparent ring-1 px-2 ring-gray-200 focus:ring-2 focus:ring-sky-200 focus:outline-none "
        placeholder="Type inside me"
        {...props}
      />
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
