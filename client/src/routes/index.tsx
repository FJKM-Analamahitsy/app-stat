import Liste from "@pages/Mpino/Liste";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NewMember from "@pages/Mpino/New";
import Page from "@pages/Mpino/Page";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";
import AuthGuard from "@auth/AuthGuard";
import Layout from "layout";
import ListeSampana from "@pages/Sampana";
import ProfileList from "@pages/Profile/List";
import ProfilePage from "@pages/Profile/Page";
import UserList from "@pages/Users/List";
import AdidyType from "@pages/Adidy/Type";
import Journal from "@pages/Adidy/List";
import PrintPage from "@pages/Print";
import ComptBoard from "@pages/Adidy/Board";
import Setting from "@pages/Setting";
import PageDiakona from "@pages/Mpino/PageDiakona";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<AuthGuard />}>
        <Route index element={<Login />} />
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="christian">
            <Route index element={<Liste />} />
            <Route path=":id" element={<Page />} />
            <Route path="new" element={<NewMember />} />
            <Route path="edit/:id" element={<NewMember />} />
          </Route>
          <Route path="profile">
            <Route index element={<ProfileList />} />
            <Route path="new" element={<ProfilePage />} />
            <Route path=":id" element={<ProfilePage />} />
          </Route>
          <Route path="users" element={<UserList />} />
          <Route path="sampana/:name" element={<ListeSampana />} />
          <Route path="adidy">
            <Route index element={<ComptBoard />} />
            <Route path="type" element={<AdidyType />} />
            <Route path="list" element={<Journal />} />
          </Route>
          <Route path="setting" element={<Setting />} />
          <Route path="diakona/:id" element={<PageDiakona />} />
        </Route>
        <Route path="print/:id" element={<PrintPage />} />
      </Route>
    </Router>
  );
};

export default Routes;
