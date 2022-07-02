import React from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const { user, signin, signup, signout } = React.useContext(AuthContext);

  return { user, signin, signup, signout };
};

export default useAuth;
