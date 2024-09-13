import { FC, useRef, useState } from "react";
import Input from "./Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import api from "@utils/api";

const Search: FC = () => {
  const [result, setResult] = useState<any>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const onclickoutside = (e: any) => {
    setFocus(container.current?.contains(e.target) || false);
  };

  const searchHandler = (e: any) => {
    api
      .get("/member/search?q=" + e.target.value + "&l=30")
      .then((res) => setResult(res.data));
  };

  window.addEventListener("click", onclickoutside);
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
        onFocus={() => setFocus(true)}
      />
      {focus && result.length > 0 && (
        <div className="absolute bg-white w-full shadow-md rounded-[5px] border border-bg mt-2 z-50 max-h-[400px] overflow-y-auto">
          {result.map((el: any, i: number) => {
            return (
              <Link
                key={i}
                to={"/mpandray/" + el._id}
                onClick={() => setFocus(false)}
              >
                <div
                  id="search-result"
                  key={i}
                  className="flex items-center justify-between p-2 px-4 hover:bg-bg"
                >
                  <Avatar label={el.name + " " + el.forname} />
                  <p>{el.mpandrayN}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
