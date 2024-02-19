import { FC, useState } from "react";
import Input from "./Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import api from "@utils/api";

const Search: FC = () => {
  const [result, setResult] = useState<any>([]);
  const [focus, setFocus] = useState<boolean>(false);

  const searchHandler = (e: any) => {
    api
      .get("/member/search?q=" + e.target.value)
      .then((res) => setResult(res.data));
  };
  return (
    <div className="relative">
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
        onBlur={(e) => setTimeout(() => setFocus(false), 500)}
      />
      {focus && result.length > 0 && (
        <div className="absolute bg-white w-full shadow-md rounded-[5px] border border-bg mt-2 z-50">
          {result.map((el: any, i: number) => {
            return (
              <Link
                key={i}
                to={"/member/" + el._id}
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
