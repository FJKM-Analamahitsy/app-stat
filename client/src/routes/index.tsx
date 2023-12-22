import Home from "@pages/Home";
import Login from "@pages/Login";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Router>
  );
};

export default Routes;
