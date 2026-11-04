import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuData: any = [
  {
    label: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={solid("border-all")} />,
    auth: "dash",
  },

  {
    label: "Chretien",
    path: "/christian",
    icon: <FontAwesomeIcon icon={solid("list")} />,
    auth: "member",
  },

  {
    label: "Groupe",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    path: "/group",
    auth: "group",
  },
  {
    label: "Presence",
    icon: <FontAwesomeIcon icon={solid("calendar-days")} />,
    path: "/attendance",
    auth: "attendance",
  },
  {
    label: "Offrande",
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
    icon: <FontAwesomeIcon icon={solid("users")} />,
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
    label: "Message",
    path: "/message",
    icon: <FontAwesomeIcon icon={solid("message")} />,
    auth: "message",
  },
  {
    label: "Utilisateur",
    path: "/users",
    icon: <FontAwesomeIcon icon={solid("user-shield")} />,
    auth: "users",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={solid("tags")} />,
    auth: "profile",
  },

  {
    label: "Migration",
    icon: <FontAwesomeIcon icon={solid("file")} />,
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
