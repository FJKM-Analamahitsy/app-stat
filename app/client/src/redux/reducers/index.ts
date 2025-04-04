import { AnyAction } from "@reduxjs/toolkit";
import { setSummary, setUser, unSetUser } from "@utils/constant";

export const userReducer = (state: any = {}, action: AnyAction) => {
  switch (action.type) {
    case setUser:
      return { ...action.data };
    case unSetUser:
      return {};
    default:
      return state;
  }
};

export const sumReducer = (state: any = {}, action: AnyAction) => {
  switch (action.type) {
    case setSummary:
      return { ...action.data };
    default:
      return state;
  }
};
