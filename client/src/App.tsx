import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
