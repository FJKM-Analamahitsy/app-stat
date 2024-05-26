import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userUnSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";
import MenuData from "@utils/Menu";
import api from "@utils/api";
import { FC, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

const SideMenu: FC = () => {
  const { pathname } = window.location;
  const [collapse, setCollapse] = useState(window.innerWidth < 769);
  const dispatch = useAppDispatch();
  window.addEventListener("resize", () => {
    setCollapse(window.innerWidth < 1024);
  });
  const navigate = useNavigate();

  const logout = () => {
    api.delete("/auth").then(() => {
      dispatch(userUnSetAction());
      navigate("/");
    });
  };
  return (
    <div className="fixed top-0 left-0 lg:relative h-screen bg-bg z-50">
      <div className="h-[68px] bg-white absolute left-full flex justify-center items-center px-4 lg:hidden">
        <FontAwesomeIcon
          icon={solid("bars")}
          className="text-grey"
          onClick={() => setCollapse(!collapse)}
        />
      </div>

      <Sidebar
        className="h-full !border-0"
        collapsed={collapse}
        collapsedWidth="0"
      >
        <div className="p-2 h-[70px] relative">
          <Logo />
        </div>
        <div className="h-[calc(100vh-86px)] flex flex-col justify-between">
          <Menu>
            {MenuData.map((mn, i) => {
              if (mn.submenu) {
                return (
                  <SubMenu key={i} label={mn.label} icon={mn.icon}>
                    {mn.submenu.map((sm, i) => {
                      return (
                        <MenuItem key={i} component={<Link to={sm.path} />}>
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
                    rootStyles={{}}
                    icon={mn.icon}
                  >
                    {mn.label}
                  </MenuItem>
                );
              }
            })}
          </Menu>

          <Menu>
            <MenuItem rootStyles={{ padding: "0" }} onClick={logout}>
              <div className="flex gap-3 h-full">
                <div className={`h-full w-[15px] rounded-r-lg`} />
                <div
                  className={`text-grey h-full w-full flex items-center rounded-[5px] px-4 gap-2`}
                >
                  <FontAwesomeIcon
                    icon={solid("right-from-bracket")}
                    className="-rotate-180"
                  />
                  <span>Logout</span>
                </div>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideMenu;
