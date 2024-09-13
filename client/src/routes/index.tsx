import Liste from "@pages/Mpandray/Liste";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NewMember from "@pages/Mpandray/New";
import Page from "@pages/Mpandray/Page";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";
import Adidy from "@pages/Mpandray/Adidy";
import AuthGuard from "@auth/AuthGuard";
import Layout from "layout";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<AuthGuard />}>
        <Route index element={<Login />} />
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="mpandray">
            <Route index element={<Liste />} />
            <Route path=":id" element={<Page />} />
            <Route path="new" element={<NewMember />} />
            <Route path="edit/:id" element={<NewMember />} />
            <Route path="adidy" element={<Adidy />} />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};

export default Routes;
