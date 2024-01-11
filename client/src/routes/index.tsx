import Dashboard from "@pages/Dashboard";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NewMember from "@pages/Member/New";
import Page from "@pages/Member/Page";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Page />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/new" element={<NewMember />} />
    </Router>
  );
};

export default Routes;
