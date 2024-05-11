import { AnyAction } from "@reduxjs/toolkit";
import { setUser, unSetUser } from "@utils/constant";

export const userReducer = (state: any = {}, action: AnyAction) => {
  switch (action.type) {
    case setUser:
      return action.data;
    case unSetUser:
      return {};
    default:
      return state;
  }
};
