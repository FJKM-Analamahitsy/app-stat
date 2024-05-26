import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuData = [
  {
    label: "Home",
    path: "/home",
    icon: <FontAwesomeIcon icon={solid("home")} />,
  },

  {
    label: "Mpandray",
    icon: <FontAwesomeIcon icon={solid("users")} />,
    submenu: [
      {
        label: "Liste",
        path: "/mpandray",
        icon: <FontAwesomeIcon icon={solid("users")} />,
      },
      {
        label: "Nouveau",
        path: "/mpandray/new",
        icon: <FontAwesomeIcon icon={solid("users")} />,
      },
      {
        label: "Adidy",
        path: "/mpandray/adidy",
        icon: <FontAwesomeIcon icon={solid("users")} />,
      },
    ],
  },
  {
    label: "Utilisateur",
    path: "/user",
    icon: <FontAwesomeIcon icon={solid("users")} />,
  },
];

export default MenuData;
