import { AnyAction } from "@reduxjs/toolkit";

export const tokenReducer = (state: string = "", action: AnyAction) => {
  switch (action.set) {
    case true:
      return action.token;
    case false:
      return "";
    default:
      return state;
  }
};
