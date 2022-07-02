import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const signin = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    setUser(response.user);
    return response.user;
  };

  const signup = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  };

  const signout = async (cb) => {
    await signOut(auth);
    setUser(false);
    cb();
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
