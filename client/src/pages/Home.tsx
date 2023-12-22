import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="w-screen h-screen m-auto flex flex-col justify-center">
      <FontAwesomeIcon
        icon={solid("home-alt")}
        className="text-blue-500"
        size="9x"
      />
      <h1 className="text-center text-[50px] text-gray-500">
        React App starter
      </h1>
      <a
        href="https://tojonir.github.io/"
        className="text-blue-600 text-center"
      >
        Tojonirina Andrianarijaona
      </a>
    </div>
  );
};

export default Home;
