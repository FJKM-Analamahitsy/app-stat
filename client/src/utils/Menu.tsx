import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuData: any = [
  {
    label: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={solid("border-all")} />,
  },

  {
    label: "List",
    path: "/christian",
    icon: <FontAwesomeIcon icon={solid("list")} />,
  },

  {
    label: "New",
    path: "/christian/new",
    icon: <FontAwesomeIcon icon={solid("user-plus")} />,
  },

  {
    label: "Contribution",
    path: "/contribution",
    icon: <FontAwesomeIcon icon={solid("money-bills")} />,
  },
];

export default MenuData;
