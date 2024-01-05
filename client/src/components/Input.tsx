import { FC } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: FC<InputProps> = () => {
  return (
    <div className="h-[40px] bg-bg">
      <input type="text" className="w-full h-full bg-transparent" />
    </div>
  );
};

export default Input;
