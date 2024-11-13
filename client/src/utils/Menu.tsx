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
    label: "Liste",
    path: "/christian",
    icon: <FontAwesomeIcon icon={solid("list")} />,
    auth: "member",
  },

  {
    label: "Nouveau",
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
        path: "/adidy",
        label: "Resumé",
      },
      {
        path: "/adidy/list",
        label: "Liste",
      },
      {
        path: "/adidy/type",
        label: "Type",
      },
    ],
  },
  {
    label: "Profiles",
    path: "/profile",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    auth: "profile",
  },
  {
    label: "Utilisateurs",
    path: "/users",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    auth: "users",
  },
];

export default MenuData;
