import { FC } from "react";

interface RadioButtonProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onClick: () => void;
}

const RadioButton: FC<RadioButtonProps> = ({ onClick, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="radio" {...props} />
      <label
        htmlFor=""
        className="text-[15px] text-grey cursor-pointer capitalize"
        onClick={onClick}
      >
        {props.value}
      </label>
    </div>
  );
};

export default RadioButton;
