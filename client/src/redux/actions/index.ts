import { setToken } from "@utils/constant";

export const tokenAction = (set: boolean, token: string = "") => ({
  type: setToken,
  set,
  token,
});
