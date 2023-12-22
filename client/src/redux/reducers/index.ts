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
