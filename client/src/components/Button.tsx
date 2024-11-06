import { FC } from "react";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`p-[8px] rounded-[5px] px-4 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
