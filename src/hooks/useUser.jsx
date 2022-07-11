import React from "react";
import { StateContext } from "../providers/Providers";

const useUser = () => {
  return React.useContext(StateContext);
};

export default useUser;
