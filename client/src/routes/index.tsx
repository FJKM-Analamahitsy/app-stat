import Liste from "@pages/Liste";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NewMember from "@pages/Member/New";
import Page from "@pages/Member/Page";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";
import Adidy from "@pages/Adidy";
import AuthGuard from "@auth/AuthGuard";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<AuthGuard />}>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="member/:id" element={<Page />} />
        <Route path="list" element={<Liste />} />
        <Route path="new" element={<NewMember />} />
        <Route path="edit/:id" element={<NewMember />} />
        <Route path="pay" element={<Adidy />} />
      </Route>
    </Router>
  );
};

export default Routes;
