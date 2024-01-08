import { setCollapse } from "@utils/constant";

export const collapseAction = (show: boolean) => ({
  type: setCollapse,
  show,
});
