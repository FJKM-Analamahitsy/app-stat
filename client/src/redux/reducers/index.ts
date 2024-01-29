import { AnyAction } from "@reduxjs/toolkit";
import { setUser, unSetUser } from "@utils/constant";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token");

export const userReducer = (
  state: any = token ? jwtDecode(token) : {},
  action: AnyAction
) => {
  switch (action.type) {
    case setUser:
      return action.data;
    case unSetUser:
      return {};
    default:
      return state;
  }
};
