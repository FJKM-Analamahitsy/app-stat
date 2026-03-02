import { FC, useRef, useState } from "react";
import Input from "./Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";

interface Props {
  onSearch: (query: string) => void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const container = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<any>();
  const [query] = useSearchParams();

  const searchHandler = (e: any) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        onSearch(e.target.value);
      }, 800)
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
        defaultValue={query.get("q") ?? ""}
        placeholder="recherche"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
