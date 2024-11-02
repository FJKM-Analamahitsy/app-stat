import Liste from "@pages/Mpino/Liste";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NewMember from "@pages/Mpino/New";
import Page from "@pages/Mpino/Page";
import { FC } from "react";
import { Routes as Router, Route } from "react-router-dom";
import Adidy from "@pages/Mpino/Adidy";
import AuthGuard from "@auth/AuthGuard";
import Layout from "layout";
import ListeSampana from "@pages/Sampana";
import ProfileList from "@pages/Profile/List";
import ProfilePage from "@pages/Profile/Page";
import UserList from "@pages/Users/List";

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
          <Route path="contribution" element={<Adidy />} />
        </Route>
      </Route>
    </Router>
  );
};

export default Routes;
