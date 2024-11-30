import { FC } from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: string[];
  valueIndex?: boolean;
  label?: string;
}

const Select: FC<SelectProps> = ({
  options,
  valueIndex = true,
  label,
  ...props
}) => {
  return (
    <div className="relative border rounded p-1">
      {label && (
        <p className="absolute z-10 bg-white -translate-y-3 translate-x-2 text-sm text-grey">
          {label}
        </p>
      )}
      <select className="w-full p-1 text-grey h-[40px] outline-none" {...props}>
        {options.map((opt, i) => {
          return (
            <option key={i} value={valueIndex ? i : opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
