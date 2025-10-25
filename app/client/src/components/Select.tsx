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
    <div className="relative border border-slate-200 rounded px-2 flex items-center">
      {label && (
        <p className="absolute z-10 bg-white -translate-y-3 translate-x-2 text-sm text-grey">
          {label}
        </p>
      )}
      <select
        className="w-full text-grey h-10 bg-transparent outline-none"
        {...props}
      >
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
