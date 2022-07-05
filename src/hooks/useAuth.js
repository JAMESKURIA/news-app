import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Loading } from "../components";
import { AuthContext } from "../providers/AuthProvider";

const FETCH_USER = gql`
  query getUser($loginId: String!) {
    login(where: { login_id: { _eq: $loginId } }) {
      login_rank
      login_username
      customers {
        customer_email
        customer_id
        customer_name
        cutomer_phoneNumber
      }
    }
  }
`;

const useAuth = () => {
  const { user, signin, signup, signout } = React.useContext(AuthContext);

  if (!user) {
  }

  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: {
      loginId: user?.uid,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log("Error fetching user: ", error);
  }

  if (data) {
    const rank = data.login[0].login_rank;
    const username = data.login[0].login_username;

    return {
      user: { rank, username, ...data.login[0].customers[0] },
      signin,
      signup,
      signout,
    };
  }

  return { user: null, signin, signup, signout };
};

export default useAuth;
