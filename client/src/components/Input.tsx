import { FC, ReactNode } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input: FC<InputProps> = ({ leftIcon, rightIcon, ...props }) => {
  return (
    <div className="h-[40px] bg-bg rounded-[5px] flex items-center gap-[10px] px-[10px]">
      {leftIcon}
      <input
        type="text"
        className="w-full bg-transparent text-grey"
        {...props}
      />
      {rightIcon}
    </div>
  );
};

export default Input;
