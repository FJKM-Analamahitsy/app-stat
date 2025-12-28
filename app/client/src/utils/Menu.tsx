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
    label: "Presence",
    icon: <FontAwesomeIcon icon={solid("calendar-days")} />,
    path: "/attendance",
    auth: "attendance",
  },
  {
    label: "Adidy",
    icon: <FontAwesomeIcon icon={solid("money-bill")} />,
    auth: "adidy",
    submenu: [
      {
        path: "/adidy",
        label: "Recap",
      },
      {
        path: "/adidy/list",
        label: "Detaille",
      },
      {
        path: "/adidy/type",
        label: "Type",
      },
    ],
  },
  {
    label: "Diacre",
    icon: <FontAwesomeIcon icon={solid("user-group")} />,
    auth: "diacre",
    submenu: [
      {
        path: "/diacre",
        label: "Liste",
      },
      {
        path: "/diacre/map",
        label: "Map",
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
  {
    label: "Migration",
    icon: <FontAwesomeIcon icon={solid("sync-alt")} />,
    auth: "migration",
    submenu: [
      {
        path: "/export",
        label: "Export",
      },
      {
        path: "/import",
        label: "Import",
      },
    ],
  },
  {
    label: "Parametre",
    path: "/setting",
    icon: <FontAwesomeIcon icon={solid("gear")} />,
    auth: "setting",
  },
];

export default MenuData;
