import { FC } from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: string[];
  valueIndex?: boolean;
}

const Select: FC<SelectProps> = ({ options, valueIndex = true, ...props }) => {
  return (
    <select
      className="w-full border px-2 rounded-[5px] text-grey h-[40px] outline-none"
      {...props}
    >
      {options.map((opt, i) => {
        return (
          <option key={i} value={valueIndex ? i : opt} className="capitalize">
            {opt}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
