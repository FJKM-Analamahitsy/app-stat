import { setSummary, setUser, unSetUser } from "@utils/constant";

export const userSetAction = (data: any = {}) => ({
  type: setUser,
  data,
});

export const userUnSetAction = () => ({
  type: unSetUser,
});

export const sumSetAction = (data: any = {}) => ({
  type: setSummary,
  data,
});
