import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SAMPANA } from "./constant";

const MenuData: any = [
  {
    label: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={solid("border-all")} />,
    auth: "dash",
  },

  {
    label: "List",
    path: "/christian",
    icon: <FontAwesomeIcon icon={solid("list")} />,
    auth: "member",
  },

  {
    label: "New",
    path: "/christian/new",
    icon: <FontAwesomeIcon icon={solid("user-plus")} />,
    auth: "newmember",
  },

  {
    label: "Sampana",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    submenu: SAMPANA.sort().map((v) => ({ path: `/sampana/${v}`, label: v })),
    auth: "sampana",
  },
  {
    label: "Adidy",
    icon: <FontAwesomeIcon icon={solid("money-bill")} />,
    auth: "adidytype",
    submenu: [
      {
        path: "/journal",
        label: "Liste",
      },
      {
        path: "/adidytype",
        label: "Type",
      },
    ],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    auth: "profile",
  },
  {
    label: "Users",
    path: "/users",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    auth: "users",
  },
];

export default MenuData;
