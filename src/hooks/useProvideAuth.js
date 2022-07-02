// Hook (use-auth.js)
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        // setUser(response.user);
        return response.user;
      }
    );
  };

  const signout = (cb) => {
    return signOut(auth).then(() => {
      setUser(false);
      cb();
    });
  };

  const sendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email).then(() => {
      return true;
    });
  };

  // const confirmPasswordReset = (code, password) => {
  //   return confirmPasswordReset(auth, code, password).then(() => {
  //     return true;
  //   });
  // };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });
  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
