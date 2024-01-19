import { setUser, unSetUser } from "@utils/constant";

export const userSetAction = (data: any = {}) => ({
  type: setUser,
  data,
});

export const userUnSetAction = () => ({
  type: unSetUser,
});
