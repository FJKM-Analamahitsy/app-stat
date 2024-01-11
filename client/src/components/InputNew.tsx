import { FC, useState } from "react";

interface InputNewProps {
  label?: string;
}

const InputNew: FC<InputNewProps> = ({ label }) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className="w-full h-[40px] rounded-[5px] border border-bg relative">
      <input
        type="text"
        className="bg-transparent w-full h-full p-2 relative z-10"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <label
        className={`absolute top-[6px] ${
          focus ? "--translate-2" : "5px"
        } left-2`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputNew;
