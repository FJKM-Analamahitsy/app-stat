import { AnyAction } from "@reduxjs/toolkit";

export const appReducer = (
  state: string = "Welcome to react starter by tojonirina",
  action: AnyAction
) => {
  switch (action.type) {
    case "app":
      return "welcome";

    default:
      return state;
  }
};

export const collapseReducer = (state: boolean = false, action: AnyAction) => {
  switch (action.show) {
    case true:
      return true;
    case false:
      return false;
    default:
      return state;
  }
};
