import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userUnSetAction } from "@redux/actions";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import MenuData from "@utils/Menu";
import { FC, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideMenu: FC = () => {
  const [collapse, setCollapse] = useState(window.innerWidth < 769);
  const dispatch = useAppDispatch();
  window.addEventListener("resize", () => {
    setCollapse(window.innerWidth < 1024);
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    navigate("/");
    dispatch(userUnSetAction());
    localStorage.removeItem("token");
  };
  return (
    <div className="fixed top-0 left-0 lg:relative h-screen bg-white z-50">
      <div
        onClick={() => setCollapse(!collapse)}
        className="h-[68px] bg-white absolute left-full flex justify-center items-center px-4 lg:hidden"
      >
        <FontAwesomeIcon icon={solid("bars")} className="text-grey" />
      </div>

      <Sidebar className="h-full" collapsed={collapse} collapsedWidth="0">
        <div className="p-2 px-8 flex items-center h-[70px] relative">
          <Logo />
        </div>
        <div className="h-[calc(100vh-86px)] flex flex-col justify-between">
          <Menu>
            {MenuData.map((mn: any, i: number) => {
              const permission = user.profile
                ? user.profile.permission
                : undefined;
              if (permission && permission.GET.indexOf(mn.auth) !== -1) {
                if (mn.submenu) {
                  return (
                    <SubMenu key={i} label={mn.label} icon={mn.icon}>
                      {mn.submenu.map((sm: any, i: number) => {
                        return (
                          <MenuItem
                            className={`${
                              pathname === sm.path
                                ? "bg-primary !text-white"
                                : "hover:bg-slate-50"
                            }`}
                            key={i}
                            component={<Link to={sm.path} />}
                            onClick={() =>
                              window.innerWidth < 1024 && setCollapse(true)
                            }
                          >
                            {sm.label}
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                } else {
                  return (
                    <MenuItem
                      key={i}
                      component={<Link to={mn.path} />}
                      className={`${
                        pathname === mn.path
                          ? "bg-primary !text-white"
                          : "hover:bg-slate-50"
                      }`}
                      icon={mn.icon}
                      onClick={() =>
                        window.innerWidth < 1024 && setCollapse(true)
                      }
                    >
                      {mn.label}
                    </MenuItem>
                  );
                }
              } else {
                return null;
              }
            })}
          </Menu>

          <Menu>
            <MenuItem
              rootStyles={{ padding: "0" }}
              onClick={logout}
              className="hover:bg-slate-50"
              icon={
                <FontAwesomeIcon
                  icon={solid("right-from-bracket")}
                  className="-rotate-180"
                />
              }
            >
              se deconnecter
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      <>
        {!collapse && (
          <div
            className="md:hidden absolute bg-slate-400 bg-opacity-10 w-screen h-full top-0"
            onClick={() => setCollapse(true)}
          ></div>
        )}
      </>
    </div>
  );
};

export default SideMenu;
