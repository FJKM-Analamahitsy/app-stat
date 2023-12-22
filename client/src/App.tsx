import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
