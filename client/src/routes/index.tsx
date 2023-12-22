import Home from "@pages/Home";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
    </Router>
  );
};

export default Routes;
