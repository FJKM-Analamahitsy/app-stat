import Logo from "@components/Logo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideMenu: FC = () => {
  const menu = [
    {
      label: "Home",
      path: "/home",
      icon: <FontAwesomeIcon icon={solid("home")} />,
    },
    {
      label: "Dashboard",
      path: "/dash",
      icon: <FontAwesomeIcon icon={solid("chart-line")} />,
    },
    {
      label: "New User",
      path: "/user",
      icon: <FontAwesomeIcon icon={solid("user-plus")} />,
    },
  ];
  const { pathname } = window.location;
  return (
    <Sidebar className="h-full !border-0">
      <div className="p-2 h-[70px]">
        <Logo />
      </div>
      <div className="pr-4 h-[calc(100vh-86px)] flex flex-col justify-between">
        <Menu>
          {menu.map((mn, i) => {
            return (
              <MenuItem
                key={i}
                component={<Link to={mn.path} />}
                rootStyles={{ padding: "0" }}
              >
                <div className="flex gap-3 h-full">
                  <div
                    className={`h-full w-[15px] rounded-r-lg ${
                      pathname === mn.path && "bg-primary"
                    }`}
                  />
                  <div
                    className={`${
                      pathname === mn.path
                        ? "bg-primary text-white"
                        : "text-grey"
                    } h-full w-full flex items-center rounded-[5px] px-4 gap-2`}
                  >
                    {mn.icon}
                    <span>{mn.label}</span>
                  </div>
                </div>
              </MenuItem>
            );
          })}
        </Menu>

        <Menu>
          <MenuItem
            component={<Link to="/login" />}
            rootStyles={{ padding: "0" }}
          >
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
  );
};

export default SideMenu;
