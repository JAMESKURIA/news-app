import { gql, useLazyQuery } from "@apollo/client";
import useAuth from "../hooks/useAuth";

import React from "react";
import { Loading } from "../components";
import AuthStack from "../navigation/stacks/AuthStack";
import CustomerTabs from "../navigation/tabs/CustomerTabs";
import MediaTabs from "../navigation/tabs/MediaTabs";

const FETCH_USER = gql`
  query getUser($loginId: String!) {
    login(where: { login_id: { _eq: $loginId } }) {
      login_rank
      login_username
    }
  }
`;

export const StateContext = React.createContext({});

const Providers = () => {
  const [currUser, setcurrUser] = React.useState({});
  const [rank, setRank] = React.useState("guest");
  const { user } = useAuth();

  // Fetch user details from hasura
  const [fetchUser, { data, loading, error }] = useLazyQuery(FETCH_USER);

  // Set Rank based on active user
  React.useEffect(() => {
    if (user) {
      fetchUser({
        variables: {
          loginId: user?.uid,
        },
      });
    }

    if (!user) setRank("guest");
  }, [user]);

  // Set current user to the data got from hasura query
  React.useEffect(() => {
    if (data) {
      const _rank = data.login[0].login_rank;
      const username = data.login[0].login_username;

      setRank(_rank);

      setcurrUser({
        rank: _rank,
        username,
      });
    }
  }, [data]);

  // Loading state
  if (loading) {
    return <Loading message="logging you in..." />;
  }

  // Error states
  if (error) {
    console.log("Error fetching user: ", error);
  }

  // If user is present, create a context provider that supplies the user details to the components
  return (
    <StateContext.Provider value={currUser}>
      {rank.toLowerCase() === "guest" && <AuthStack />}
      {rank.toLowerCase() === "customer" && <CustomerTabs />}
      {rank.toLowerCase() === "media" && <MediaTabs />}
      {rank.toLowerCase() === "super-admin" && <MediaTabs />}
    </StateContext.Provider>
  );
};

export default Providers;
