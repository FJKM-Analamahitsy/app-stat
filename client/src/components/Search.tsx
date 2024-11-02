import { FC, useRef, useState } from "react";
import Input from "./Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  onSearch: (query: string) => void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const container = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<any>();

  const searchHandler = (e: any) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        onSearch(e.target.value);
      }, 500)
    );
  };

  return (
    <div ref={container} className="relative">
      <Input
        leftIcon={
          <FontAwesomeIcon
            icon={solid("magnifying-glass")}
            color="#909090"
            size="sm"
          />
        }
        placeholder="search"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
