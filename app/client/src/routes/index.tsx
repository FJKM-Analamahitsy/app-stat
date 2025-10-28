import Login from "@pages/Login";
import { FC, lazy } from "react";
import { Routes as Router, Route } from "react-router-dom";
import AuthGuard from "@auth/AuthGuard";
import Layout from "layout";
import PrintQRPDF from "@pages/Attendance/PrintQr";

const Liste = lazy(() => import("@pages/Mpino/Liste"));
const Home = lazy(() => import("@pages/Home"));
const NewMember = lazy(() => import("@pages/Mpino/New"));
const Page = lazy(() => import("@pages/Mpino/Page"));
const ListeSampana = lazy(() => import("@pages/Sampana"));
const ProfileList = lazy(() => import("@pages/Profile/List"));
const ProfilePage = lazy(() => import("@pages/Profile/Page"));
const UserList = lazy(() => import("@pages/Users/List"));
const AdidyType = lazy(() => import("@pages/Adidy/Type"));
const Journal = lazy(() => import("@pages/Adidy/List"));
const PrintPage = lazy(() => import("@pages/Print"));
const ComptBoard = lazy(() => import("@pages/Adidy/Board"));
const Setting = lazy(() => import("@pages/Setting"));
const Map = lazy(() => import("@pages/diakona/Map"));
const Import = lazy(() => import("@pages/Migration/Import"));
const Export = lazy(() => import("@pages/Migration/Export"));
const Diakona = lazy(() => import("@pages/diakona"));
const Attendance = lazy(() => import("@pages/Attendance"));

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
          <Route path="attendance">
            <Route index element={<Attendance />} />
            <Route path="qr" element={<PrintQRPDF />} />
          </Route>
          <Route path="adidy">
            <Route index element={<ComptBoard />} />
            <Route path="type" element={<AdidyType />} />
            <Route path="list" element={<Journal />} />
          </Route>
          <Route path="setting" element={<Setting />} />
          <Route path="export" element={<Export />} />
          <Route path="import" element={<Import />} />
          <Route path="diacre">
            <Route index element={<Diakona />} />
            <Route path="map" element={<Map />} />
          </Route>
        </Route>
        <Route path="print/:id" element={<PrintPage />} />
      </Route>
    </Router>
  );
};

export default Routes;
