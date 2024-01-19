import { FC, useEffect, useState } from "react";
import Input from "./Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import MiniSearch from "minisearch";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Search: FC = () => {
  const [searchindex, setSearchIndex] = useState<any>(null);
  const [result, setResult] = useState<any>([]);
  useEffect(() => {
    const index = new MiniSearch({
      fields: ["name", "forname", "mpandrayN"],
      storeFields: ["_id", "name", "forname", "mpandrayN"],
      searchOptions: {
        boost: { mpandrayN: 2, name: 1 },
        prefix: true,
        fuzzy: 0.25,
      },
    });
    api.get("/member").then((res) => {
      const data = res.data.map((itm: any, i: number) => {
        return { ...itm, id: i };
      });
      index.addAll(data);
      setSearchIndex(index);
    });
  }, []);

  const searchHandler = (e: any) => {
    const data = searchindex.search(e.target.value, {});
    setResult(data);
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
      />
      {result.length > 0 && (
        <div className="absolute bg-white w-full shadow-sm mt-2 z-50">
          {result.map((el: any, i: number) => {
            return (
              <Link to={"/member/" + el._id}>
                <div
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
